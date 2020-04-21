# DirectX Middleware Engine
## FlashBang API

FlashBang API is an audio middleware engine being developed regularly in my spare time. The project aims to implement standard features of other competing audio middleware API's, while being much more intuitive than current solutions. The project will also be expanding on features lacking in [DirectXTK Audio](https://github.com/microsoft/DirectXTK/wiki/Audio) by working with features from [XAudio2](https://docs.microsoft.com/en-us/windows/win32/xaudio2/xaudio2-introduction). FlashBang is largely based on concepts and syntax from [Nlohmann's JSON library](https://github.com/nlohmann/json) to be as scalable and intuitive as possible.

Currently the project is being prepared for a pre-alpha release around April 18th 2020, with subsequent releases and features planned and scheduled throughout the year. This project will be open source and published on github in mid April, and each stable release will also be available on [NuGet](https://www.nuget.org/).

### Early Developement

FlashBang is a made up of a few different audio implementation practices I started back in 2018. During some of my early OpenGL and DirectX projects I experimented with writing my own implementations of standard audio middleware features such as Real Time Parameter Controls and various audio effects such as LFO's and fades. This began as an exploration of how these systems worked on a lower level, but as I kept improving and adding features to these projects I was encouraged by my colleagues and mentors to really move forward with these concepts and publish them as an independent API. Early development continued on and off between projects, but is now being developed regularly in my free time as a passion/hobby project.

Overall, this is a project I've been happy to spend countless hours on, and I am very excited to see how it is shaping up and coming together, and what I have planned for the future.

The main goals of the project are:

- Low level audio implementation separated from game code
- As little obstruction/entanglement with game parameters and systems as possible
- Easily scalable
- Intuitive to use, easy to read
- Difficult to break with automatic common error correction
- Verbose, clear warnings and errors
- Easily adjustable sound effects and filters
- Simple RTPC's for all audio-related parameters
- Basic sound modulation and envelope controls

## Roadmap:

 - Release 0 (Pre Alpha): April 31st, 2020:
    - Dynamic audio and scene loading and management
    - Loading sound data and declarations from json files
    - Inline string interpretations for consecutive or similar filepaths
    - Param adjustments and game var hooks on sound object construction/declaration
    - Linear RTPC's for:
        - Pitch
        - Volume
        - Panning
        - Horizontal sequencing order
   - Global audio/scene params
    - Time based effects (e.g. Fades/Transitions)
    - Dynamic sound memory management
    - Easy game-var connections

- Release 1 (Alpha): May 31st, 2020
    - Wavebanks, .ogg and .mp3 support
    - Scheduled automatic loading/unloading
    - Implicit/automatic game engine hooks
    - Custom RTPC mapping
    - Nonlinear RTPC control
    - Vertical sequencing controls
    - XAudio2 Reverb library and parameter control
    - Audio implementation unit testing & debug interface/environment (may be moved to Beta)

- Release 2 (Beta): June 31st, 2020
    - Delay-based audio effects and controls
    - Oscillation and modular filter patches
    - Research and planning on multiple platform support
    - Research into GUI libraries

- Release 3: Auguest 31st, 2020:
    - Graphical Interface
    - Unity integration
    - Stretch goal: OpenAL implementation and Dolphin integration
