import ExpoModulesCore
import SwiftUI

import FoundationModels
import Foundation

@available(iOS 26.0, *)
private let model = SystemLanguageModel.default

struct FeaturedSuggestion {
  let title: String
  let imageUrl: String
  
  init?(from dict: [String: Any]) {
    guard let title = dict["title"] as? String,
          let imageUrl = dict["imageUrl"] as? String else {
      return nil
    }
    self.title = title
    self.imageUrl = imageUrl
  }
}

final class AnimatedInputViewProps: ExpoSwiftUI.ViewProps {
  @Field var defaultValue: String = ""
  @Field var placeholder: String = ""
  @Field var autoFocus: Bool = false
  @Field var disableMainAction: Bool = false
  @Field var suggestions: [[String: Any]] = []
  var onValueChanged = EventDispatcher()
  var onFocusChanged = EventDispatcher()
  var onPressImageGallery = EventDispatcher()
  var onPressMainAction = EventDispatcher()
  var onSelectSuggestion = EventDispatcher()
}

struct AnimatedInputView: ExpoSwiftUI.View, ExpoSwiftUI.WithHostingView {
  @ObservedObject var props: AnimatedInputViewProps
  @FocusState private var isFocused: Bool
  
  @State var text: String = ""
  @State var isGenerating: Bool = false
  
  let generatorHaptic = UISelectionFeedbackGenerator()
  
  init(props: AnimatedInputViewProps) {
    self.props = props
  }
  
  
  var body: some View {
    
    VStack {
      Spacer(minLength: 0)
      
      // Suggestions view - shown when not focused
      if !props.suggestions.isEmpty {
        let suggestions = props.suggestions.compactMap { FeaturedSuggestion(from: $0) }
        
        VStack(alignment: .leading, spacing: 8) {
          Text("Suggestions")
            .font(.system(size: 14, weight: .bold))
            .foregroundColor(.primary)
            .padding(.horizontal, 16)
          
          ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 16) {
              ForEach(Array(suggestions.enumerated()), id: \.offset) { index, suggestion in
                Button {
                  generatorHaptic.selectionChanged()
                  let newPrompt = "Generate a realistic \(suggestion.title.lowercased()) tattoo"
                  text = newPrompt
                  isFocused = true
                  props.onValueChanged(["value": newPrompt])
                  props.onSelectSuggestion(["title": suggestion.title])
                } label: {
                  VStack(alignment: .center, spacing: 4) {
                    AsyncImage(url: URL(string: suggestion.imageUrl)) { phase in
                      switch phase {
                      case .empty:
                        ProgressView()
                          .frame(width: 40, height: 40)
                      case .success(let image):
                        image
                          .resizable()
                          .aspectRatio(contentMode: .fill)
                          .frame(width: 40, height: 40)
                          .clipShape(Circle())
                      case .failure:
                        Image(systemName: "photo")
                          .frame(width: 40, height: 40)
                      @unknown default:
                        EmptyView()
                      }
                    }
                    
                    Text(suggestion.title)
                      .font(.system(size: 12))
                      .foregroundColor(.secondary)
                      .lineLimit(1)
                  }
                }
                .buttonStyle(.plain)
              }
            }
            .padding(.horizontal, 16)
          }
          
          Text("Note: AI Tattoo may create unexpected results.")
            .font(.system(size: 10))
            .foregroundColor(.secondary)
            .frame(maxWidth: .infinity, alignment: .center)
            .padding(.horizontal, 16)
        }
        .padding(.bottom, 8)
        .opacity(isFocused ? 0 : 1)
        .animation(isFocused ? .linear(duration: 0.0) : .easeOut(duration: 0.5), value: isFocused)
      }
      
      let fillColor = Color.gray.opacity(0.15)
      
      if #available(iOS 17.0, *) {
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
          
          if #available(iOS 26.0, *) {
            if model.isAvailable {
              Button {
                generatorHaptic.selectionChanged()
                Task {
                  let session = LanguageModelSession()
                  do {
                    isGenerating = true
                    
                    let stream =  session.streamResponse(
                      options: GenerationOptions(maximumResponseTokens: 50)
                    ) {
                      "Generate a short prompt to generate a tattoo image"
                      
                      "Only reply with the prompt, don't use quotes, don't repeat the same prompt"
                    }
                    for try await partialResponse in stream {
                      self.text = partialResponse.content
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
          Button {
            generatorHaptic.selectionChanged()
            isFocused = false
          } label: {
            Image(systemName: "keyboard.chevron.compact.down")
              .fontWeight(.medium)
              .foregroundStyle(Color.primary)
              .frame(maxWidth: .infinity, maxHeight: .infinity)
              .background(fillColor, in: .circle)
            
          }
        } trailingAction: {
          //        Button {
          //          isFocused.toggle()
          //        } label: {
          //          Image(systemName: "keyboard")
          //            .fontWeight(.medium)
          //            .foregroundStyle(Color.primary)
          //            .frame(maxWidth: .infinity, maxHeight: .infinity)
          //            .background(fillColor, in: .circle)
          //
          //        }
        } mainAction: {
          let button = Button {
            generatorHaptic.selectionChanged()
            isFocused = false
            text = ""
            props.onPressMainAction([:])
          } label: {
            Image(systemName: "arrow.up")
              .fontWeight(.medium)
              .foregroundStyle(Color.primary)
              .frame(maxWidth: .infinity, maxHeight: .infinity)
          }
            .disabled(text.isEmpty || isGenerating || props.disableMainAction)
          
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
    }
    .onChange(of: text) { newValue in
      props.onValueChanged(["value": newValue])
    }
    .onChange(of: isFocused) { newValue in
      props.onFocusChanged(["isFocused": newValue])
    }
  }
}

