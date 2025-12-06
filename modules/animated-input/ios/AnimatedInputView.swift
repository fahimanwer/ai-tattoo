import ExpoModulesCore
import SwiftUI
import TipKit

import FoundationModels
import Foundation

// MARK: - TipKit Tip Definition
@available(iOS 17.0, *)
struct PromptInputTip: Tip {
  var title: Text {
    Text("Try On and Update Tattoos in Seconds")
  }

  var message: Text? {
    Text("Pick or capture an image, then describe what you want changed. The model only sees the selected image—clear prompts give better results.")
  }
  
  var image: Image? {
    Image(systemName: "sparkles")
  }
}

@available(iOS 26.0, *)
private let model = SystemLanguageModel.default

final class AnimatedInputViewProps: ExpoSwiftUI.ViewProps {
  @Field var defaultValue: String = ""
  @Field var placeholder: String = ""
  @Field var autoFocus: Bool = false
  @Field var disableMainAction: Bool = false
  var onValueChanged = EventDispatcher()
  var onFocusChanged = EventDispatcher()
  var onPressImageGallery = EventDispatcher()
  var onPressMainAction = EventDispatcher()
  var onPressSecondIcon = EventDispatcher()
}

struct AnimatedInputView: ExpoSwiftUI.View, ExpoSwiftUI.WithHostingView {
  @ObservedObject var props: AnimatedInputViewProps
  @FocusState private var isFocused: Bool
  
  @State var text: String = ""
  @State var isGenerating: Bool = false
  @State var originalText: String? = nil  // Stores text before improvement (nil = no improvement done)
  @State var isImproving: Bool = false    // Tracks if currently streaming improvement
  @State var previousGeneratedPrompt: String? = nil  // Stores the last generated prompt to avoid repetition
  
  let generatorHaptic = UISelectionFeedbackGenerator()
  
  init(props: AnimatedInputViewProps) {
    self.props = props
  }
  
  
  var body: some View {
    
    VStack {
      Spacer(minLength: 0)
      
      let fillColor = Color.gray.opacity(0.15)
      
      if #available(iOS 17.0, *) {
        // Inline tip above the input
        TipView(PromptInputTip(), arrowEdge: .bottom)
        
        AnimatedBottomBar(hint: props.placeholder, text: $text, isFocused: $isFocused) {
          Button {
            generatorHaptic.selectionChanged()
            props.onPressImageGallery([:])
          } label: {
            Image(systemName: "photo.badge.plus")
              .fontWeight(.medium)
              .foregroundStyle(Color.primary)
              .frame(maxWidth: .infinity, maxHeight: .infinity)
              .background(fillColor, in: .circle)
            
          }
          Button {
            generatorHaptic.selectionChanged()
            isFocused = false
            props.onPressSecondIcon([:])
          } label: {
            Image(systemName: "camera")
              .fontWeight(.medium)
              .foregroundStyle(Color.primary)
              .frame(maxWidth: .infinity, maxHeight: .infinity)
              .background(fillColor, in: .circle)
            
          }
          if #available(iOS 26.0, *) {
            if model.isAvailable {
              // Wand icon - generate random prompt
              Button {
                generatorHaptic.selectionChanged()
                Task {
                  let session = LanguageModelSession()
                  do {
                    isGenerating = true
                    
                    var promptInstructions = """
                    Generate a short, original prompt for a creative tattoo design.
                    Only reply with the new prompt, no quotes or explanations.

                    Guidelines:
                    - Always start the prompt with: "Generate a realistic tattoo of..."
                    - Describe a specific concept in 1–2 sentences.
                    - Be imaginative, visually detailed, and concise.
                    - Avoid generic or vague ideas.
                    - Do NOT repeat or resemble previous prompts.
                    """

                    if let previous = previousGeneratedPrompt {
                      promptInstructions += """
                    IMPORTANT: Avoid repeating or closely resembling this previous prompt:
                    \(previous)
                    """
                    }
                    let stream = session.streamResponse(
                      options: GenerationOptions(maximumResponseTokens: 50)
                    ) {
                      promptInstructions
                    }
                    
                    var generatedPrompt = ""
                    for try await partialResponse in stream {
                      self.text = partialResponse.content
                      generatedPrompt = partialResponse.content
                    }
                    
                    // Store the generated prompt to avoid repetition next time
                    if !generatedPrompt.isEmpty {
                      previousGeneratedPrompt = generatedPrompt
                    }
                    
                    isGenerating = false
                  } catch {
                    print("Error generating response: \(error)")
                    isGenerating = false
                  }
                }
              } label: {
                if isGenerating {
                  ProgressView()
                    .progressViewStyle(.circular)
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                    .background(fillColor, in: .circle)
                } else {
                  Image(systemName: "wand.and.sparkles")
                    .fontWeight(.medium)
                    .foregroundStyle(Color.primary)
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                    .background(fillColor, in: .circle)
                }
              }
            }
          } else {
            // Fallback on earlier versions
          }
        } trailingAction: {
          if #available(iOS 26.0, *) {
            if model.isAvailable && !text.isEmpty {
              Group {
                if originalText != nil {
                  // Undo pill button - restore original text
                  Button {
                    generatorHaptic.selectionChanged()
                    text = originalText ?? ""
                    originalText = nil
                  } label: {
                    if isImproving {
                      ProgressView()
                        .progressViewStyle(.circular)
                        .frame(height: 35)
                        .padding(.horizontal, 12)
                        .background(fillColor, in: Capsule())
                    } else {
                      Text("Undo")
                        .font(.caption)
                        .fontWeight(.medium)
                        .foregroundStyle(Color.primary)
                        .frame(height: 35)
                        .padding(.horizontal, 12)
                        .background(fillColor, in: Capsule())
                    }
                  }
                  .disabled(isImproving)
                } else {
                  // Improve Prompt pill button
                  Button {
                    generatorHaptic.selectionChanged()
                    Task {
                      let session = LanguageModelSession()
                      do {
                        isImproving = true
                        originalText = text
                        
                        let userInput = text
                        let stream = session.streamResponse(
                          options: GenerationOptions(maximumResponseTokens: 100)
                        ) {
                          """
                          You are a tattoo-prompt enhancer.

                          Your job:
                          Transform the user's input into a concise (1–2 sentences), detailed prompt for generating realistic tattoos.

                          Behavior rules:
                          - Always describe a **realistic tattoo** (never a full image change).
                          - If the user’s input implies applying a tattoo to a person (e.g., references to “my face,” “my neck,” “on me,” “on this photo,” “this pic,” “my arm,” etc.), interpret it as tattoo placement on an existing image and:
                            - Emphasize that the person, pose, and background must remain unchanged.
                            - Describe how the tattoo should be applied naturally on the visible body area.
                          - If the user’s input does NOT reference a person or photo, generate a standalone tattoo design prompt.
                          - Enhance vague input with style, linework, shading, artistic details, and composition.
                          - Output only the improved prompt—no explanations, no quotes.

                          Examples:
                          - "change the color" → "Change the tattoo color to deep crimson red."
                          - "face tattoos" → "Add small, realistic face tattoos—fine-line symbols, tiny stars, and a subtle teardrop—applied naturally without altering facial features."
                          - "cover my neck in tattoos" → "Cover the visible neck area with a realistic tattoo sleeve made of dark ornamental patterns and fine-line texture while keeping the person unchanged."
                          - "dragon" → "Create a traditional Japanese dragon tattoo with bold outlines, flowing clouds, and intricate scale detail."
                          """
                          
                          "User input: \(userInput)"
                        }
                        for try await partialResponse in stream {
                          self.text = partialResponse.content
                        }
                        isImproving = false
                      } catch {
                        print("Error improving prompt: \(error)")
                        isImproving = false
                        // Restore original text on error
                        if let original = originalText {
                          text = original
                          originalText = nil
                        }
                      }
                    }
                  } label: {
                    if isImproving {
                      ProgressView()
                        .progressViewStyle(.circular)
                        .frame(height: 35)
                        .padding(.horizontal, 12)
                        .background(fillColor, in: Capsule())
                    } else {
                      Text("Improve Prompt")
                        .font(.caption)
                        .fontWeight(.medium)
                        .foregroundStyle(Color.primary)
                        .frame(height: 35)
                        .padding(.horizontal, 12)
                        .background(fillColor, in: Capsule())
                    }
                  }
                  .disabled(isImproving)
                }
              }
              .fixedSize()
              .transition(.scale.combined(with: .opacity))
              .animation(.spring(response: 0.3, dampingFraction: 0.7), value: originalText != nil)
            }
          }
        } mainAction: {
          let button = Button {
            generatorHaptic.selectionChanged()
            isFocused = false
            text = ""
            originalText = nil  // Reset improvement state
            props.onPressMainAction([:])
          } label: {
            Image(systemName: "arrow.up")
              .fontWeight(.medium)
              .foregroundStyle(Color.primary)
              .frame(maxWidth: .infinity, maxHeight: .infinity)
          }
            .disabled(text.isEmpty || isGenerating || isImproving || props.disableMainAction)
          
          if #available(iOS 26.0, *) {
            button.buttonStyle(.glassProminent)
          } else {
            button.background(fillColor, in: .circle)
          }
        }
      } else {
        // Fallback on earlier versions
      }
      
    }
    .padding()
    .contentShape(Rectangle())
    .onTapGesture {
      if isFocused {
        generatorHaptic.selectionChanged()
        isFocused = false
      }
    }
    .gesture(
      DragGesture(minimumDistance: 20)
        .onEnded { value in
          let vertical = value.translation.height
          
          if vertical > 20 {
            // Swipe down to dismis
            generatorHaptic.selectionChanged()
            isFocused = false
          } else if vertical < -20 {
            // Swipe up to focus
            generatorHaptic.selectionChanged()
            isFocused = true
          }
        }
    )
    .onAppear {
      text = props.defaultValue
      if props.autoFocus {
        isFocused = true
      }
      
      // Configure TipKit (safe to call multiple times, will only configure once)
      if #available(iOS 17.0, *) {
        Task {
          do {
            try Tips.configure([
              .displayFrequency(.monthly),
              .datastoreLocation(.applicationDefault)
            ])
          } catch {
            // TipKit already configured or unavailable
            print("TipKit configuration: \(error.localizedDescription)")
          }
        }
      }
    }
    .onChange(of: text) { newValue in
      props.onValueChanged(["value": newValue])
    }
    .onChange(of: isFocused) { newValue in
      props.onFocusChanged(["isFocused": newValue])
    }
  }
}

