declare module 'node-rmtp-stream' {
    export default class StreamBuilder {
        constructor(inputVideo: string);
        streamLoop(): StreamBuilder
        quality(type: 'low' | 'medium' | 'high' | 'best'): StreamBuilder
        onStart(startFunction: () => void): StreamBuilder
        onEnd(endFunction: () => void): StreamBuilder
        stream(rtmp_key: string): void
    }
}
