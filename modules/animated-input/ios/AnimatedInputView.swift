import ExpoModulesCore
import SwiftUI

import FoundationModels
import Foundation

@available(iOS 26.0, *)
private let model = SystemLanguageModel.default

final class AnimatedInputViewProps: ExpoSwiftUI.ViewProps {
  @Field var title: String?
  @Field var systemImage: String?
  @Field var color: Color?
}

struct AnimatedInputView: ExpoSwiftUI.View, ExpoSwiftUI.WithHostingView {
  init(props: AnimatedInputViewProps) {
    self.props = props
  }
  
  @ObservedObject var props: AnimatedInputViewProps
  @State var text: String = ""
  @State var isGenerating: Bool = false
  
  let generatorHaptic = UISelectionFeedbackGenerator()
  
  @FocusState private var isFocused: Bool
  
  var body: some View {
    
    VStack {
      Spacer(minLength: 0)
      
      let fillColor = Color.gray.opacity(0.15)
      
      if #available(iOS 17.0, *) {
        AnimatedBottomBar(hint: "hint", text: $text, isFocused: $isFocused) {
          Button {
            generatorHaptic.selectionChanged()
            
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
            isFocused.toggle()
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
          if #available(iOS 26.0, *) {
            Button {
              generatorHaptic.selectionChanged()
              
            } label: {
              Image(systemName: "arrow.up")
                .fontWeight(.medium)
                .foregroundStyle(Color.primary)
                .frame(maxWidth: .infinity, maxHeight: .infinity)
                .background(fillColor, in: .circle)
              
            }
            .buttonStyle(.glassProminent)
            .disabled(text.isEmpty || isGenerating)
          } else {
            // Fallback on earlier versions
          }
        }
      } else {
        // Fallback on earlier versions
      }
      
    }
    .padding()
  }
}

