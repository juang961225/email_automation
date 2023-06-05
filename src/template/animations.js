var tl
$(document).ready( function() {
	tl = new TimelineMax();

// Frame 1
	tl.from(".bg",1, {scale:1.05, },  "primero")
	.from(".bg_green", 6, {	y: 40, height:"160px", ease: Back.easeOut}, "primero")
	.from(".text_1", 1, {autoAlpha:0, y: 40, ease: Back.easeOut}, "primero")
	.from(".totem", 1.7, {autoAlpha:0, y: 40, ease: Back.easeOut}, "primero")
	.from(".auto", 1.5, {autoAlpha:0, x: -40, ease: Back.easeOut}, "primero")
	.to(".text_1", 1, {autoAlpha:0, y: 50, delay:4, ease: Back.easeOut}, "primero")
	.from(".text_2", 1, {autoAlpha:0, y: 50, delay:4.2, ease: Back.easeOut}, "primero")
	
	});

