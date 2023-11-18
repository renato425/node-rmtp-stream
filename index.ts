import ffmpeg, {FfmpegCommand} from 'fluent-ffmpeg'

type StartFunction = () => void
type EndFunction = () => void

/**
 * Represents a StreamBuilder for RMTP streaming using Node.js
 */

export default class StreamBuilder {
    private command: FfmpegCommand
    private onStartFunction?: StartFunction
    private onEndFunction?: EndFunction

    /**
     * Create a StreamBuilder instance.
     * @param {string} inputVideo - The path of the input video.
     */
    constructor(inputVideo: string) {
        this.command = ffmpeg(inputVideo).inputOption('-re')
    }

    /**
     * Set the stream to loop indefinitely.
     * @returns {StreamBuilder} The StreamBuilder instance.
     */
    streamLoop(): StreamBuilder {
        this.command.inputOptions(['-stream_loop', '-1'])
        return this
    }

    /**
     * Set the quality of the stream.
     * @param {string} type - The type of quality ('low', 'medium', 'high' or 'best')
     * @returns {StreamBuilder} The StreamBuilder instance.
     */
    quality(type: 'low' | 'medium' | 'high' | 'best'): StreamBuilder {
        this.command.outputOptions('-quality', type)
        return this
    }

    /**
     * Define a function to execute when the stream starts.
     * @param {StartFunction} startFunction - The function to execute on stream start.
     * @returns {StreamBuilder} The StreamBuilder instance.
     */
    onStart(startFunction: StartFunction): StreamBuilder {
        this.onStartFunction = startFunction
        return this
    }

    /**
     * Define a function to execute when the stream ends.
     * @param {EndFunction} endFunction - The function to execute on stream ends.
     * @returns {StreamBuilder} The StreamBuilder instance.
     */
    onEnd(endFunction: EndFunction): StreamBuilder {
        this.onEndFunction = endFunction
        return this
    }

    /**
     * Start streaming to the RTMP server.
     * @param {string} rmtp_key - The RMTP key for the server
     */
    stream(rmtp_key: string): void {
        this.command
        .audioCodec('aac')
        .audioFrequency(44100)
        .videoCodec('copy')
        .format('flv')
        .output(rmtp_key)
        .on('start', function() {
            console.log('[Node-RMTP-Stream] Stream Started')
            if (this.onStartFunction) this.onStartFunction()
        })
        .on('end', function(e) {
            console.log('[Node-RMTP-Stream] Stream Ended')
            if (this.onEndFunction) this.onEndFunction()
        })
        .on('error', function(e) {
            console.log('[Node-RMTP-Stream] Error: ' + e)
        })
        .run()
    }
}
