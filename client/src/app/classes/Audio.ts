
export class AudioPreview {
    trackId = '4JpKVNYnVcJ8tuMKjAj50A'; // Example track ID
    audio: HTMLAudioElement | undefined;
    previewUrl: string | undefined;

    constructor() { }

    play(previewUrl: string) {
        if (this.audio) {
            this.audio.pause();
        }
        this.playAudio(previewUrl);

    }

    playAudio(previewUrl: string) {
        if (!this.audio) {
            this.audio = new Audio(previewUrl);
        } else {
            this.audio.src = previewUrl;
        }
        this.audio.play();
    }

    stopAudio() {
        if (this.audio) {
            this.audio.pause();
        }
    }

}