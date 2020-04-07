import React from 'react';

export default class Otterspace extends React.Component {

    constructor(props){
        super(props);
    } 

    render() {
        return (
<div>
<h1 id="return-to-otter-space">Return to Otter Space</h1>
<h2 id="junior-animation-and-interactive-experience">Junior Animation and Interactive Experience</h2>
<p>Return to Otter Space is a combination animated short film and interactive experience produced during a junior film project at RIT&#39;s School of Film and Animation.
The players and audience are introduced to two characters. The astronaut, a survivor of a crash landing on an unknown aquatic planet, and Jelly, an otter-like creature who befriends the astronaut on the planet. Players alternate control of both characters as the two learn to work together to overcome obstacles and help the astronaut return to space. </p>
<p>The film and game were produced together over 13-15 weeks in Fall-Winter 2020.
The short film and soundtrack are linked at the bottom of this post.</p>
<p><img src="https://res.cloudinary.com/dyzmnhqpr/image/upload/q_auto:eco/v1585425860/otterspace-ship_httiiq.jpg" alt=""/></p>
<h2 id="my-work">My Work</h2>
<p>Astro Zoodios, the team assembled to make this project, consisted of five members. My role on the team was as the Audio Director, in charge of crafting the overall soundscape of both the film and game according to the artistic vision of the Creative Director; following and maintaining the time constraints set by the Producer. While some audio production work was tasked to other team members, most of the production, design, and implementation of the music and sound effects made up the majority of my work</p>
<p><img src="https://res.cloudinary.com/dyzmnhqpr/image/upload/q_auto:eco/v1585425859/otterspace-cave_st4skg.jpg" alt=""/></p>
<h3 id="implementation-and-software-challenges">Implementation and Software Challenges</h3>
<p>Game audio was implemented by two main technologies: AudioKinetic Wwise and the Unity animation timeline. Wwise was largely used to handle audio loading, event triggers, and real time parameter control events (RTPCs) based on game variables during gameplay. Unity’s timeline allowed for similar audio controls but based on animation states and scene duration.</p>
<p>There was a notable challenge of how to exchange audio controls and handlers from cutscenes to in-game objects. This had to be seamless and continuous while the game levels were unloaded for cutscene assets and vice versa. I developed a system where audio script gameobjects could persist through scene transitions, but also be initialized and tracked during a sequence-breaking reload such as during a level select or debugging. While I am sure there’s probably a built-in Wwise or Unity feature to handle all this for me, it was straightforward and suitable at the time to develop this system myself.</p>
<h2 id="music-composition-and-design">Music Composition and Design</h2>
<p>Scoring both game and film audio simultaneously posed some very interesting challenges. Story beats in film are static, whereas the actions leading up to those same beats in an interactive environment are emergent. The film portion had a stricter deadline set a couple weeks back before the game portion, so work on the film took priority and game audio was retroactively edited to fit into game loops.</p>
<p><img src="https://res.cloudinary.com/dyzmnhqpr/image/upload/q_auto:eco/v1585425860/otterspace-hub_xeqetl.jpg" alt=""/></p>
<h3 id="early-audio-prototyping-characters-themes">Early Audio Prototyping: Characters Themes</h3>
<p>This was my first real venture into composing multiple tracks for a complete story, so I was very excited that I could have an opportunity to explore composition with character leitmotifs. So the first bit of composition was a short little experiment with how I wanted to represent the characters musically. It made the most sense to me to set up the astronaut theme unresolved, morph a bit during adversity, and then resolve in a call-and-response-like duet with the otter theme. This is the demo recorded for experimenting with character themes:</p>
<iframe width="100%" height="166"src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/785537992&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>


<h3 id="environment-demos">Environment Demos:</h3>
<p>The next demo I produced was more around shaping the overall soundscape of the game environments. More or less, this was made up of motifs for space/adventure, mystery/danger, and then a resolution which represented overcoming that danger with teamwork.</p>
<p>The space theme used fragments of the original astronaut in a minimalist style to really let the music swell and crescendo, kind of providing the anxiety of the astronaut during his emergency landing. The astronaut is represented by a piano, since it’s a familiar instrument in Western music so it should be easy to attach that idea to the astronaut and make him more empathetic to the audience. I also used windchimes to represent the sense of wonder/ethereality of space, and then later added synths to represent adventure and discovery. For the planet environments it was pretty straightforward. Since it’s a water planet I felt there should be slowly evolving, somewhat dissonant synth pads, and some contrasting “alien” sounding synths to make it sound somewhat haunting and strange.</p>
<iframe width="100%" height="166"src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1020777331&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>


<h2 id="final-audio-tracks">Final Audio Tracks</h2>
<p>The space section of the environment demo I thought captured the mood pretty well, so largely this could just be mastered with some minor adjustments and the addition of (somewhat heavy-handed) sweeping synths representing the ship crashing.</p>
<iframe width="100%" height="166"src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/785538064&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>


<p>Overall, the Otter and Astronaut themes I found difficult to work with. Instead I decided it was best to represent them with just the instruments I had chosen. With the astronaut I had picked a piano, so the otter needed to be something complimentary but different, and more unfamiliar. As a percussionist I absolutely love the lamellophone family, so I chose a Kalimba. These two work really well together as they can both share a similar range and both share a percussive character, but with a contrasting timbre.
For the characters first interaction, I had the otter play a variation of the adventure theme, with the piano eventually &quot;learning&quot; the same melody, and adding accompaniment. This I felt was a good representation of how they both meet, and eventually come to understand and befriend each other.</p>
<iframe width="100%" height="166"src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/785538094&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>


<p>&quot;In This Together&quot; is probably the track I loved the most. I grabbed some of the original &quot;alien world&quot; sounds I used in the space demos, but also implemented further variations of the character ideas in &quot;First Contact.&quot; This track was written for the Dark Caves level, and plot wise  it was where the Astronaut and Jelly really solidified their relationship. To fit the animation length of the scene this track had to be edited shorter than I would have liked, and eventually due to time constraints had to be cut completely. It was truly disappointing, but probably a valuable lesson overall.</p>
<iframe width="100%" height="166"src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/785538082&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>


<p>The outro of the film was a reprise of the intro, but has a moment of hesitation as the Otter “says” goodbye to the astronaut, and gifts him a shell. In contrast to the opening, the music swells back up but doesn’t provide any clues as to if the astronaut actually leaves the planet or not.</p>
<p><img src="https://res.cloudinary.com/dyzmnhqpr/image/upload/q_auto:eco/v1585425860/otterspace-characters_ditijq.jpg" alt=""/></p>
<h1 id="final-products">Final Products</h1>
<h2 id="and-what-happened-to-that-game-demo">...and what happened to that game demo?</h2>
<p>Due to external work deadlines, poor work dependency communication, and lack of planning for potential setbacks, the project unfortunately ended in a couple weeks of severe crunch. This led to some difficult decisions on what elements were critical for each project and what ultimately needed to be cut. The film lost a somewhat critical scene, which while the overall story was minimally impacted, there was a lot of work that ultimately remained unseen. The game, while missing some initially proposed levels, was able to include the cut content from the film. However, due to a Unity engine corruption between versions, the demo was ultimately broken and eventually abandoned.</p>
<p>Nonetheless, the film was screened even in a rough state and is available here:</p>
<iframe width="100%" src="https://sofatube.cad.rit.edu/videos/embed/37357" frameborder="0" allowfullscreen></iframe>

<p>And the composition work I did is available here:</p>
<iframe width="100%" height="600"src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1020777331&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>

</div>
        );
    }
}