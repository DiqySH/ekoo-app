interface Window {
  SpeechRecognition: {
    new (): ISpeechRecognition;
  };
  webkitSpeechRecognition: {
    new (): ISpeechRecognition;
  };
}

interface ISpeechRecognition {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: ISpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}

interface ISpeechRecognitionEvent {
  readonly resultIndex: number;
  readonly results: ISpeechRecognitionResultList;
}

interface ISpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly 0: { transcript: string };
}

interface ISpeechRecognitionResultList {
  readonly length: number;
  readonly [index: number]: ISpeechRecognitionResult;
}
