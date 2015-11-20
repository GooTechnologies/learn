---
title: Post Effects
indent: 2
weight: 3000
---

In the post effects panel it is possible to create a stack of effects, affecting the final render composition.

The effects in the stack are applied <strong>top to bottom</strong>. <strong>Reordering</strong> the effects is done by drag and dropping one effect box at a time, activated by pressing down on the top side of the effect box. The cursor is changed to a pointer upon hovering on the draggable area.

<div class="well info">
To see the applied post effects, make sure you have <strong>post effects enabled</strong> in the canvas'/viewport's top menu.
</div>

### Effect Controls

In the effect's box various inputs are available to customize it's output.

<div class="well info">
	<strong>Quick Tip: Create Slider Controllers</strong>
	<p>
		The sliders are there to provide sane defaults of the particular value its controlling. - However, it is possible to override the value by either editing the number or click-and-dragging on the text input next to the slider.
	</p>
</div>

### Technical Details

Post effect layers in create are made out of render passes in the engine. You can find a visual test on the [bloom post effect here](http://code.gooengine.com/latest/visual-test/goo/passpack/BloomPass/BloomPass-vtest.html)

# Available Effects

## Antialias

FXAA based antialiasing. For smoothing out jagged edges.

- Span: Area of the smoothing effect

## Bloom

Intensify and create glow out of the high valued colors in the input.

- Opacity: Amount of bloom applied.

- Size: Glow area

- Gain: Brightness added

- Intensity: Contrast

## Bleach

Alter input color by it's luminace.

- Opacity: Blending multiplier for the effect


## Blur

Gaussian blur.

- Amount: Blending amount

- Size: Blur area size

## Contrast

Alters the brightness, contrast and saturation.

- Brightness: Negative values remove brightness, positive adds

- Contrast: Change the contrast

- Saturation: Color saturation

## Dot

Adds an overlay with "see-through holes". 

- Angle: Change the angle of the hole grid

- Scale: Scale the holes uniformly

- SizeX: Scale the hole size on the x-axis

- SizeY: Scale the hole size on the y-axis

## Edge Detect

Difference of Gaussians based edge detection.

- Gauss Sigma: Sets the base of the two gaussian kernels

- Threshold: Threshold value to be considered an edge

- Background %: Blending amount of the non-edge color (background color) and the input color

- Edge Color: Pick the color of the edges

- Background Color: Pick the color of non-edges


## Film Grain

Adds distoring noise and horizontal lines.

- Noise: Amount of noise

- Line Intensity: The lines' color intensity

- Line Count: The number of lines


## Hatch

Converts image to grayscale and creates a pattern based on the grayscale value.

- Width: Pattern detail

- Spread: Pattern size

## HSB (Hue Saturation Brightness)

Alters the hue, saturation and brightness

- Hue: Offset the input's hue with this amount

- Saturation: Saturation of color

- Brightness: Add or remove brightness

## Levels

Clamp value levels of input to a new range.

- Gamma: Add or remove gamma

- Min Input: Set the minimum input used

- Max Input: Set the maximum input used

- Min Output: Set the minimum output

- Max Output: Set the maximum output

## Motion Blur

Uses previously rendered frames to produce a motion blur trail.

The scale is applied accumulately per trailing image from the center of the screen.

- Amount: Blending amount of the previous frames

- Scale: Scale the previous frames image with this amount

## Noise

Blends colored noise with input

- Noise: Amount to blend input with noise

## Overlay

Adds a texture as an overlay

- Texture: The texture to be used

- Blend Mode: Blend mode of the overlay and the input

- Amount: Blending amount

## Radial

Add directional highlight streaks from target color of the input.

- Offset: Use to pick what input value is the highlight target

- Multiplier: Multiplier of the highlighted streaks

## RGB Shift

Split the input into red, green and blue , outputs combination with some offset between the colors.

- Amount: Distance between the split images

- Angle: Angle set in radians for the split direction

## Sepia

Sepia color filter.

- Amount: Blending of the filter, in percentage

## Tint

Convert the input's luminance to one color.

- Amount: Blending of the input and tinted output

## Vignette

Adds an vignette effect, gradients around the edges of the image.

- Offset: Area of gradient

- Darkness: The color of the gradient








