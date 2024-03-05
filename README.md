# Apollonian-Gasket

This repo contains code to render the Apollonian gasket. The Apollonian gasket is a special kind of circle packing where you start with a big circle and then fit smaller circles inside it, each touching the big circle and each other.

Descartes' theorem, named after the famous philosopher and mathematician René Descartes, is a mathematical formula that helps us understand the relationships between circles when they're packed together like in the Apollonian gasket.

Here's the idea: for any three circles that are mutually tangent (meaning they touch each other externally), there's a neat formula that relates the curvatures (or how "bendy" they are) of these circles. The formula is:
\((k_1 + k_2 + k_3)^2 = 2(k_1^2 + k_2^2 + k_3^2)\)

Here, \(k1\), \(k2\), and \(k3\) are the curvatures of the circles. The curvature of a circle is just the reciprocal of its radius. So if you have a big circle with radius \(R)\, its curvature is \(1/R\).

Now, in the Apollonian gasket, we start with three circles inside a larger circle. These circles are tangent to each other and the big circle. Using Descartes' theorem, we can find the curvatures of these circles and use them to find the curvatures of the smaller circles we pack inside them, and so on.

The cool thing about this theorem is that it applies not just to three circles but to any number of circles that are all tangent to each other. So as we keep adding smaller circles into the gaps, we can keep using Descartes' theorem to understand how they all fit together. It's named after the ancient Greek mathematician Apollonius, who was really good at studying shapes and curves.

The [code](https://editor.p5js.org/codingtrain/sketches/zrq8KHXnO) for most of the versions is from [Daniel Shiffman](https://thecodingtrain.com) -- Apollonian Coding Challenge coming soon!

The python and circle inversion code sets actual pixels, so it can't be adapted like Daniel's code. The python code is from user [FB36](https://code.activestate.com/recipes/users/4172570/) posted in ActiveStateCode. I obtained the circle inversion code by posting the python code in ChatGPT3.5 and asking it to port to p5.js. It did a pretty decent job--I only had to modify the loop slightly.

## 🌄 Gallery

<!-- IMAGE-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center"><a href=""> <img class="img" src="assets/apollonian-pentagons.jpg" alt="Apollonian gasket with 6 pentagons" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Apollonian gasket with polar pentagons</b></sub></a></td>
      <td align="center"><a href=""> <img class="img" src="assets/apollonian-triangles.jpg" alt="Apollonian gasket with polar triangles" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Apollonian gasket with polar triangles</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/apollonian-phyllotaxis.jpg" alt="Apollonian gasket with Phyllotaxis" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="500" /><br /><sub><b><br/>Apollonian gasket with Phyllotaxis</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/apollonian-starburst.jpg" alt="Apollonian gasket with polar curve" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="500" /><br /><sub><b><br/></b>Apollonian gasket with polar curve</sub></a></td>
    </tr>
<tr>
      <td align="center"><a href=""> <img class="img" src="assets/clocks.jpg" alt="Apollonian gasket with clocks" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Apollonian gasket with clocks</b></sub></a></td>
      <td align="center"><a href=""> <img class="img" src="assets/apollonian-3d.jpg" alt="Circle Inversion with spheres" style="vertical-align:top;" width="500" /><br /><sub><b><br/>Apollonian gasket with spheres</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/apollonian-4circles.png" alt="Circle inversion with 4 initial circles" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="500" /><br /><sub><b><br/>Apollonian gasket with 4 initial circles</b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="" alt="" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="500" /><br /><sub><b><br/></b></sub></a></td>
    </tr>

 </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- IMAGE-LIST:END -->

![gif](assets/GIF_apollonian.gif)
