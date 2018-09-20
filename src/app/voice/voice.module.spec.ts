import { VoiceModule } from './voice.module';

describe('VoiceModule', () => {
  let voiceModule: VoiceModule;

  beforeEach(() => {
    voiceModule = new VoiceModule();
  });

  it('should create an instance', () => {
    expect(voiceModule).toBeTruthy();
  });
});
