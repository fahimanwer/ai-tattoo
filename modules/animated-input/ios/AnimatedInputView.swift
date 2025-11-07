import ExpoModulesCore
import SwiftUI

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
  @FocusState private var isFocused: Bool
  
  var body: some View {
   
    VStack {
      Spacer(minLength: 0)
      
      let fillColor = Color.gray.opacity(0.15)
      
      if #available(iOS 17.0, *) {
        AnimatedBottomBar(hint: "hint", text: $text, isFocused: $isFocused) {
          Button {
            
          } label: {
            Image(systemName: "plus")
              .fontWeight(.medium)
              .foregroundStyle(Color.primary)
              .frame(maxWidth: .infinity, maxHeight: .infinity)
              .background(fillColor, in: .circle)
            
          }
          Button {
            
          } label: {
            Image(systemName: "magnifyingglass")
              .fontWeight(.medium)
              .foregroundStyle(Color.primary)
              .frame(maxWidth: .infinity, maxHeight: .infinity)
              .background(fillColor, in: .circle)
            
          }
          Button {
            
          } label: {
            Image(systemName: "mic.fill")
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
          Button {
            isFocused.toggle()
          } label: {
            Image(systemName: "checkmark")
              .fontWeight(.medium)
              .foregroundStyle(Color.primary)
              .frame(maxWidth: .infinity, maxHeight: .infinity)
              .background(fillColor, in: .circle)
            
          }
        }
      } else {
        // Fallback on earlier versions
      }

    }
    .padding()
  }
}
