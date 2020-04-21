import React from 'react';

export default class Flashbang extends React.Component {

    constructor(props){
        super(props);
    } 

    render() {
        return (
<div>
<h1 id="directx-middleware-engine">DirectX Middleware Engine</h1>
<h2 id="flashbang-api">FlashBang API</h2>
<p>FlashBang API is an audio middleware engine being developed regularly in my spare time. The project aims to implement standard features of other competing audio middleware API&#39;s, while being much more intuitive than current solutions. The project will also be expanding on features lacking in <a href="https://github.com/microsoft/DirectXTK/wiki/Audio">DirectXTK Audio</a> by working with features from <a href="https://docs.microsoft.com/en-us/windows/win32/xaudio2/xaudio2-introduction">XAudio2</a>. FlashBang is largely based on concepts and syntax from <a href="https://github.com/nlohmann/json">Nlohmann&#39;s JSON library</a> to be as scalable and intuitive as possible.</p>
<p>Currently the project is being prepared for a pre-alpha release around April 18th 2020, with subsequent releases and features planned and scheduled throughout the year. This project will be open source and published on github in mid April, and each stable release will also be available on <a href="https://www.nuget.org/">NuGet</a>.</p>
<h3 id="early-developement">Early Developement</h3>
<p>FlashBang is a made up of a few different audio implementation practices I started back in 2018. During some of my early OpenGL and DirectX projects I experimented with writing my own implementations of standard audio middleware features such as Real Time Parameter Controls and various audio effects such as LFO&#39;s and fades. This began as an exploration of how these systems worked on a lower level, but as I kept improving and adding features to these projects I was encouraged by my colleagues and mentors to really move forward with these concepts and publish them as an independent API. Early development continued on and off between projects, but is now being developed regularly in my free time as a passion/hobby project.</p>
<p>Overall, this is a project I&#39;ve been happy to spend countless hours on, and I am very excited to see how it is shaping up and coming together, and what I have planned for the future.</p>
<p>The main goals of the project are:</p>
<ul>
<li>Low level audio implementation separated from game code</li>
<li>As little obstruction/entanglement with game parameters and systems as possible</li>
<li>Easily scalable</li>
<li>Intuitive to use, easy to read</li>
<li>Difficult to break with automatic common error correction</li>
<li>Verbose, clear warnings and errors</li>
<li>Easily adjustable sound effects and filters</li>
<li>Simple RTPC&#39;s for all audio-related parameters</li>
<li>Basic sound modulation and envelope controls</li>
</ul>
<h2 id="roadmap">Roadmap:</h2>
<ul>
<li>Release 0 (Pre Alpha): April 31st, 2020:<ul>
<li>Dynamic audio and scene loading and management</li>
<li>Loading sound data and declarations from json files</li>
<li>Inline string interpretations for consecutive or similar filepaths</li>
<li>Param adjustments and game var hooks on sound object construction/declaration</li>
<li>Linear RTPC&#39;s for:<ul>
<li>Pitch</li>
<li>Volume</li>
<li>Panning</li>
<li>Horizontal sequencing order<ul>
<li>Global audio/scene params</li>
</ul>
</li>
</ul>
</li>
<li>Time based effects (e.g. Fades/Transitions)</li>
<li>Dynamic sound memory management</li>
<li>Easy game-var connections</li>
</ul>
</li>
</ul>
<ul>
<li><p>Release 1 (Alpha): May 31st, 2020</p>
<ul>
<li>Wavebanks, .ogg and .mp3 support</li>
<li>Scheduled automatic loading/unloading</li>
<li>Implicit/automatic game engine hooks</li>
<li>Custom RTPC mapping</li>
<li>Nonlinear RTPC control</li>
<li>Vertical sequencing controls</li>
<li>XAudio2 Reverb library and parameter control</li>
<li>Audio implementation unit testing &amp; debug interface/environment (may be moved to Beta)</li>
</ul>
</li>
<li><p>Release 2 (Beta): June 31st, 2020</p>
<ul>
<li>Delay-based audio effects and controls</li>
<li>Oscillation and modular filter patches</li>
<li>Research and planning on multiple platform support</li>
<li>Research into GUI libraries</li>
</ul>
</li>
<li><p>Release 3: Auguest 31st, 2020:</p>
<ul>
<li>Graphical Interface</li>
<li>Unity integration</li>
<li>Stretch goal: OpenAL implementation and Dolphin integration</li>
</ul>
</li>
</ul>

</div>
        );
    }
}