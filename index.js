const ffmpeg = require('fluent-ffmpeg');

/**
 * Represents a StreamBuilder for RMTP streaming using Node.js.
 */
class StreamBuilder {
    /**
     * Create a StreamBuilder instance.
     * @param {string} inputVideo - The path of the input video.
     */
    constructor(inputVideo) {
        this.command = ffmpeg(inputVideo).inputOption('-re');
    }

    /**
     * Set the stream to loop indefinitely.
     * @returns {StreamBuilder} The StreamBuilder instance.
     */
    streamLoop() {
        this.command.inputOptions(['-stream_loop', '-1']);
        return this;
    }

    /**
     * Set the quality of the stream.
     * @param {string} type - The type of quality ('low', 'medium', 'high', or 'best').
     * @returns {StreamBuilder} The StreamBuilder instance.
     */
    quality(type) {
        this.command.outputOptions('-quality', type);
        return this;
    }

    /**
     * Define a function to execute when the stream starts.
     * @param {Function} startFunction - The function to execute on stream start.
     * @returns {StreamBuilder} The StreamBuilder instance.
     */
    onStart(startFunction) {
        this.onStartFunction = startFunction;
        return this;
    }

    /**
     * Define a function to execute when the stream ends.
     * @param {Function} endFunction - The function to execute on stream end.
     * @returns {StreamBuilder} The StreamBuilder instance.
     */
    onEnd(endFunction) {
        this.onEndFunction = endFunction;
        return this;
    }

    /**
     * Start streaming to the RMTP server.
     * @param {string} rmtp_key - The RMTP key for the server.
     */
    stream(rmtp_key) {
        this.command
            .audioCodec('aac')
            .audioFrequency(44100)
            .videoCodec('copy')
            .format('flv')
            .output(rmtp_key)
            .on('start', () => {
                console.log('[Node-RMTP-Stream] Stream Started');
                if (this.onStartFunction) this.onStartFunction();
            })
            .on('end', () => {
                console.log('[Node-RMTP-Stream] Stream Ended');
                if (this.onEndFunction) this.onEndFunction();
            })
            .on('error', (e) => {
                console.log(`[Node-RMTP-Stream] Error: ${e}`);
            })
            .run();
    }
}

module.exports.StreamBuilder = StreamBuilder;
