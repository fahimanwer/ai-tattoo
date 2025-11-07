import * as React from 'react';

import { AnimatedInputViewProps } from './AnimatedInput.types';

export default function AnimatedInputView(props: AnimatedInputViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
