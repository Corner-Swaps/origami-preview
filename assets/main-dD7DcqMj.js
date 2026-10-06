import{M as Ie,O as Ue,B as qe,F as we,S as ye,U as Me,V as te,W as He,H as $e,N as je,C as Qe,a as re,R as Ve,b as We,c as Xe,L as Ke,d as Ye,e as Ze,A as Je,f as et,g as tt,h as at,m as ae,i as oe,j as le,P as ce,k as de,s as ue,l as Le,n as j,o as pe,p as O,Q as Ee,v as it,q as st,D as Ce,r as nt}from"./patterns-zwrVWLYj.js";const rt={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class I{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const ot=new Ue(-1,1,1,-1,0,1);class lt extends qe{constructor(){super(),this.setAttribute("position",new we([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new we([0,2,0,0,2,0],2))}}const ct=new lt;class Te{constructor(e){this._mesh=new Ie(ct,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,ot)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class ke extends I{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof ye?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Me.clone(e.uniforms),this.material=new ye({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Te(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class _e extends I{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const n=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,m;this.inverse?(o=0,m=1):(o=1,m=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(n.REPLACE,n.REPLACE,n.REPLACE),r.buffers.stencil.setFunc(n.ALWAYS,o,4294967295),r.buffers.stencil.setClear(m),r.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(n.EQUAL,1,4294967295),r.buffers.stencil.setOp(n.KEEP,n.KEEP,n.KEEP),r.buffers.stencil.setLocked(!0)}}class dt extends I{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class ut{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new te);this._width=i.width,this._height=i.height,t=new He(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:$e}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new ke(rt),this.copyPass.material.blending=je,this.clock=new Qe}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let n=0,r=this.passes.length;n<r;n++){const o=this.passes[n];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(n),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),o.needsSwap){if(i){const m=this.renderer.getContext(),x=this.renderer.state.buffers.stencil;x.setFunc(m.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),x.setFunc(m.EQUAL,1,4294967295)}this.swapBuffers()}_e!==void 0&&(o instanceof _e?i=!0:o instanceof dt&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new te);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,n=this._height*this._pixelRatio;this.renderTarget1.setSize(i,n),this.renderTarget2.setSize(i,n);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,n)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class pt extends I{constructor(e,t,i=null,n=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=n,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new re}render(e,t,i){const n=e.autoClear;e.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=n}}const ft={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new te(1/1024,1/512)}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec2 resolution;
		varying vec2 vUv;

		#define EDGE_STEP_COUNT 6
		#define EDGE_GUESS 8.0
		#define EDGE_STEPS 1.0, 1.5, 2.0, 2.0, 2.0, 4.0
		const float edgeSteps[EDGE_STEP_COUNT] = float[EDGE_STEP_COUNT]( EDGE_STEPS );

		float _ContrastThreshold = 0.0312;
		float _RelativeThreshold = 0.063;
		float _SubpixelBlending = 1.0;

		vec4 Sample( sampler2D  tex2D, vec2 uv ) {

			return texture( tex2D, uv );

		}

		float SampleLuminance( sampler2D tex2D, vec2 uv ) {

			return dot( Sample( tex2D, uv ).rgb, vec3( 0.3, 0.59, 0.11 ) );

		}

		float SampleLuminance( sampler2D tex2D, vec2 texSize, vec2 uv, float uOffset, float vOffset ) {

			uv += texSize * vec2(uOffset, vOffset);
			return SampleLuminance(tex2D, uv);

		}

		struct LuminanceData {

			float m, n, e, s, w;
			float ne, nw, se, sw;
			float highest, lowest, contrast;

		};

		LuminanceData SampleLuminanceNeighborhood( sampler2D tex2D, vec2 texSize, vec2 uv ) {

			LuminanceData l;
			l.m = SampleLuminance( tex2D, uv );
			l.n = SampleLuminance( tex2D, texSize, uv,  0.0,  1.0 );
			l.e = SampleLuminance( tex2D, texSize, uv,  1.0,  0.0 );
			l.s = SampleLuminance( tex2D, texSize, uv,  0.0, -1.0 );
			l.w = SampleLuminance( tex2D, texSize, uv, -1.0,  0.0 );

			l.ne = SampleLuminance( tex2D, texSize, uv,  1.0,  1.0 );
			l.nw = SampleLuminance( tex2D, texSize, uv, -1.0,  1.0 );
			l.se = SampleLuminance( tex2D, texSize, uv,  1.0, -1.0 );
			l.sw = SampleLuminance( tex2D, texSize, uv, -1.0, -1.0 );

			l.highest = max( max( max( max( l.n, l.e ), l.s ), l.w ), l.m );
			l.lowest = min( min( min( min( l.n, l.e ), l.s ), l.w ), l.m );
			l.contrast = l.highest - l.lowest;
			return l;

		}

		bool ShouldSkipPixel( LuminanceData l ) {

			float threshold = max( _ContrastThreshold, _RelativeThreshold * l.highest );
			return l.contrast < threshold;

		}

		float DeterminePixelBlendFactor( LuminanceData l ) {

			float f = 2.0 * ( l.n + l.e + l.s + l.w );
			f += l.ne + l.nw + l.se + l.sw;
			f *= 1.0 / 12.0;
			f = abs( f - l.m );
			f = clamp( f / l.contrast, 0.0, 1.0 );

			float blendFactor = smoothstep( 0.0, 1.0, f );
			return blendFactor * blendFactor * _SubpixelBlending;

		}

		struct EdgeData {

			bool isHorizontal;
			float pixelStep;
			float oppositeLuminance, gradient;

		};

		EdgeData DetermineEdge( vec2 texSize, LuminanceData l ) {

			EdgeData e;
			float horizontal =
				abs( l.n + l.s - 2.0 * l.m ) * 2.0 +
				abs( l.ne + l.se - 2.0 * l.e ) +
				abs( l.nw + l.sw - 2.0 * l.w );
			float vertical =
				abs( l.e + l.w - 2.0 * l.m ) * 2.0 +
				abs( l.ne + l.nw - 2.0 * l.n ) +
				abs( l.se + l.sw - 2.0 * l.s );
			e.isHorizontal = horizontal >= vertical;

			float pLuminance = e.isHorizontal ? l.n : l.e;
			float nLuminance = e.isHorizontal ? l.s : l.w;
			float pGradient = abs( pLuminance - l.m );
			float nGradient = abs( nLuminance - l.m );

			e.pixelStep = e.isHorizontal ? texSize.y : texSize.x;

			if (pGradient < nGradient) {

				e.pixelStep = -e.pixelStep;
				e.oppositeLuminance = nLuminance;
				e.gradient = nGradient;

			} else {

				e.oppositeLuminance = pLuminance;
				e.gradient = pGradient;

			}

			return e;

		}

		float DetermineEdgeBlendFactor( sampler2D  tex2D, vec2 texSize, LuminanceData l, EdgeData e, vec2 uv ) {

			vec2 uvEdge = uv;
			vec2 edgeStep;
			if (e.isHorizontal) {

				uvEdge.y += e.pixelStep * 0.5;
				edgeStep = vec2( texSize.x, 0.0 );

			} else {

				uvEdge.x += e.pixelStep * 0.5;
				edgeStep = vec2( 0.0, texSize.y );

			}

			float edgeLuminance = ( l.m + e.oppositeLuminance ) * 0.5;
			float gradientThreshold = e.gradient * 0.25;

			vec2 puv = uvEdge + edgeStep * edgeSteps[0];
			float pLuminanceDelta = SampleLuminance( tex2D, puv ) - edgeLuminance;
			bool pAtEnd = abs( pLuminanceDelta ) >= gradientThreshold;

			for ( int i = 1; i < EDGE_STEP_COUNT && !pAtEnd; i++ ) {

				puv += edgeStep * edgeSteps[i];
				pLuminanceDelta = SampleLuminance( tex2D, puv ) - edgeLuminance;
				pAtEnd = abs( pLuminanceDelta ) >= gradientThreshold;

			}

			if ( !pAtEnd ) {

				puv += edgeStep * EDGE_GUESS;

			}

			vec2 nuv = uvEdge - edgeStep * edgeSteps[0];
			float nLuminanceDelta = SampleLuminance( tex2D, nuv ) - edgeLuminance;
			bool nAtEnd = abs( nLuminanceDelta ) >= gradientThreshold;

			for ( int i = 1; i < EDGE_STEP_COUNT && !nAtEnd; i++ ) {

				nuv -= edgeStep * edgeSteps[i];
				nLuminanceDelta = SampleLuminance( tex2D, nuv ) - edgeLuminance;
				nAtEnd = abs( nLuminanceDelta ) >= gradientThreshold;

			}

			if ( !nAtEnd ) {

				nuv -= edgeStep * EDGE_GUESS;

			}

			float pDistance, nDistance;
			if ( e.isHorizontal ) {

				pDistance = puv.x - uv.x;
				nDistance = uv.x - nuv.x;

			} else {

				pDistance = puv.y - uv.y;
				nDistance = uv.y - nuv.y;

			}

			float shortestDistance;
			bool deltaSign;
			if ( pDistance <= nDistance ) {

				shortestDistance = pDistance;
				deltaSign = pLuminanceDelta >= 0.0;

			} else {

				shortestDistance = nDistance;
				deltaSign = nLuminanceDelta >= 0.0;

			}

			if ( deltaSign == ( l.m - edgeLuminance >= 0.0 ) ) {

				return 0.0;

			}

			return 0.5 - shortestDistance / ( pDistance + nDistance );

		}

		vec4 ApplyFXAA( sampler2D  tex2D, vec2 texSize, vec2 uv ) {

			LuminanceData luminance = SampleLuminanceNeighborhood( tex2D, texSize, uv );
			if ( ShouldSkipPixel( luminance ) ) {

				return Sample( tex2D, uv );

			}

			float pixelBlend = DeterminePixelBlendFactor( luminance );
			EdgeData edge = DetermineEdge( texSize, luminance );
			float edgeBlend = DetermineEdgeBlendFactor( tex2D, texSize, luminance, edge, uv );
			float finalBlend = max( pixelBlend, edgeBlend );

			if (edge.isHorizontal) {

				uv.y += edge.pixelStep * finalBlend;

			} else {

				uv.x += edge.pixelStep * finalBlend;

			}

			return Sample( tex2D, uv );

		}

		void main() {

			gl_FragColor = ApplyFXAA( tDiffuse, resolution.xy, vUv );

		}`},U={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class ht extends I{constructor(){super(),this.uniforms=Me.clone(U.uniforms),this.material=new Ve({name:U.name,uniforms:this.uniforms,vertexShader:U.vertexShader,fragmentShader:U.fragmentShader}),this._fsQuad=new Te(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},We.getTransfer(this._outputColorSpace)===Xe&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Ke?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Ye?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Ze?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Je?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===et?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===tt?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===at&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const fe=["Frog","Crane","Whale","Butterfly"],Re={},mt=[],M=a=>document.getElementById(a),D=M("appDialog");let ie;function H(){D.open&&D.close(),document.body.classList.remove("modal-open"),M("modalScrim").hidden=!0,document.querySelectorAll("#menu button").forEach(a=>{a.removeAttribute("aria-current")}),M("menu").style.setProperty("--active-tab",-1)}function ze(a){ie=document.activeElement,document.querySelectorAll(".panel-content>section").forEach(t=>t.hidden=t.id!==`panel-${a}`),M("panelTitle").textContent={color:"Paper color",paper:"Paper texture",models:"Origami library",thanks:"Thanks"}[a],document.body.classList.add("modal-open"),M("modalScrim").hidden=!1,D.open||D.showModal();const e={color:0,paper:1,models:2,thanks:3}[a];e!==void 0&&(M("menu").style.setProperty("--active-tab",e),document.querySelectorAll("#menu button").forEach((t,i)=>{t.toggleAttribute("aria-current",i===e)})),document.dispatchEvent(new CustomEvent("panel-open",{detail:a}))}function gt(){document.querySelectorAll("[data-panel]").forEach(a=>a.addEventListener("click",()=>ze(a.dataset.panel))),M("closePanel").onclick=H,D.addEventListener("close",()=>{H(),ie?.isConnected&&ie.focus()}),D.addEventListener("click",a=>{if(a.target!==D)return;const e=D.getBoundingClientRect();(a.clientX<e.left||a.clientX>e.right||a.clientY<e.top||a.clientY>e.bottom)&&H()})}const s=a=>document.getElementById(a),se=a=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${a}</svg>`,Y={play:se('<path d="m8 5 11 7-11 7z"/>'),pause:se('<path d="M8 5v14M16 5v14"/>')},De=new URLSearchParams(document.location?.search||"").get("animal"),Ne=fe.includes(De)?De:"Crane";let W=Ne,c,h=0,u=0,d=!1,p=!1,v=!1,z=1,Z=0,k="#087b96",N="#ffffff",Q="solid",A=ae(Q,k),Pe=null,w=null,b,R,f,l,g,T,y=!0,J=0;const q=new Map,B=new Map;gt();function he(a,e=!1){a.add(new st(16777215,7899549,1.5));const t=new Ce(16774887,2.5);t.position.set(-3.5,4,5),t.castShadow=e,e&&(t.shadow.mapSize.set(2048,2048),Object.assign(t.shadow.camera,{left:-3,right:3,top:3,bottom:-3,near:.1,far:20}),t.shadow.intensity=.12,t.shadow.bias=-3e-4,t.shadow.normalBias=.008),a.add(t);const i=new Ce(13031926,.95);i.position.set(3,-1,-5),a.add(i)}function vt(){b=new oe({canvas:s("paper"),antialias:!0}),b.setPixelRatio(Math.min(devicePixelRatio||1,2)),b.shadowMap.enabled=!0,b.shadowMap.autoUpdate=!1,b.shadowMap.needsUpdate=!0,b.shadowMap.type=nt,R=new le,R.background=new re("#ffffff"),f=new ce(36,1,.1,30),f.position.set(.5,3.2,4.2),l=new pe(f,s("paper")),l.enablePan=!1,l.zoomToCursor=!1,l.minDistance=1.5,l.maxDistance=12,l.maxPolarAngle=Math.PI*.55,l.minPolarAngle=Math.PI*.15,l.addEventListener("change",()=>y=!0),l.addEventListener("start",()=>{w=null}),he(R,!1),T=new ut(b),T.addPass(new pt(R,f)),T.addPass(new ht);const a=new ke(ft);T.addPass(a);const e=()=>{const t=s("paper").getBoundingClientRect();if(!t.width||!t.height)return;b.setSize(t.width,t.height,!1),f.aspect=t.width/t.height,f.updateProjectionMatrix(),T.setSize(t.width,t.height);const i=b.getPixelRatio();a.uniforms.resolution.value.set(1/(t.width*i),1/(t.height*i)),y=!0};new ResizeObserver(e).observe(s("paper")),e(),s("paper").addEventListener("webglcontextlost",t=>{t.preventDefault(),d=!1,p=!1,v=!1,F("3D view interrupted","Reload this page to restore the graphics view.")})}async function me(a){if(q.has(a))return q.get(a);const e=(async()=>{const t=await fetch(a==="Crane"?"./crane-motion.json":`./models/${a.toLowerCase()}.json`);if(!t.ok)throw Error("Model unavailable");const i=await t.json();if(it(i,a),i.complete!==!0)throw Error("Folding lesson is incomplete");return i})();q.set(a,e);try{return await e}catch(t){throw q.delete(a),t}}function F(a,e,t){s("modelMessage").hidden=!1,s("messageTitle").textContent=a,s("messageText").textContent=e,s("referenceLink").hidden=!0,s("playback").hidden=!0,s("stepPillWrap").hidden=!0,ve(!1)}function St(){w=null,g&&(R.remove(g),g.dispose(),g=null),c=null,d=!1,p=!1,v=!1,s("steps").replaceChildren(),y=!0}async function ge(a,e="default"){const t=++Z;if(Pe?.(),Pe=null,s("appSurface").style.minHeight="",s("videoLesson").hidden=!0,s("paper").hidden=!1,s("viewControls").hidden=!1,s("front").hidden=!1,s("back").hidden=!1,s("spatial").hidden=!1,s("menuColor").disabled=!1,s("menuPaper").disabled=!1,s("retry").hidden=!0,W=a,document.title=a?`${a} — Origami`:"Origami",Be(),b&&St(),!a){s("paper").setAttribute("aria-label","Origami workspace"),F("Choose a model","Select a tutorial from Models to begin.");return}if(Re[a]){s("viewControls").hidden=!0,F(a,"The native 3D folding sequence is not ready yet. This animal cannot currently be folded in the app.");return}F("Loading…","");try{const i=await me(a);if(t!==Z)return;b||vt(),c=i,h=0,u=0,d=!1,p=!1,v=!1,g=new de(c,A,{backColor:N}),g.rotation.set(Math.PI,Math.PI,0),R.add(g),l.target.set(0,0,0),X("front",5.2),s("modelMessage").hidden=!0,s("playback").hidden=!1,s("stepPillWrap").hidden=!1,wt(),E(),S()}catch(i){if(t!==Z)return;console.error(i),F("Unable to show the 3D model",/WebGL|context/i.test(i.message)?"3D graphics are unavailable in this browser. Try a browser with graphics acceleration enabled.":"The model could not load. Please try again."),s("retry").hidden=!1,s("retry").onclick=()=>{s("retry").hidden=!0,ge(a)}}}function bt(){return c.surfaceMarks&&h===c.frames.length-1&&u===1?[]:[...new Set(c.activeEdges.slice(0,h+(u>=1?1:0)).flat())]}function xt(){if(!g||!f||!l||!c||!g.geometry.boundingSphere)return;g.updateMatrixWorld();const a=g.geometry.boundingSphere,e=l.target,t=a.center.clone().applyMatrix4(g.matrixWorld),i=t.clone().sub(e);i.lengthSq()>1e-10&&(e.copy(t),f.position.add(i),l.update());const n=a.radius,r=Math.tan(O.degToRad(f.fov/2)),o=Math.min(r,r*f.aspect);if(!(o>0))return;const m=O.clamp(n/o*1.12,l.minDistance,l.maxDistance),x=f.position.distanceTo(e);if(x<m-1e-6){const P=f.position.clone().sub(e).normalize();f.position.copy(e).addScaledVector(P,O.lerp(x,m,.25)),l.update(),y=!0}}function E(){!g||!c||(g.update(ue(c,h,u),bt(),u<1?c.activeEdges[h]:[]),xt(),b.shadowMap.needsUpdate=!0,y=!0)}function wt(){const a=c.titles||mt;s("steps").replaceChildren(...a.map((e,t)=>{const i=document.createElement("button");i.className="step",i.dataset.step=t,i.setAttribute("role","option");const n=document.createElement("span");n.className="number",n.textContent=t+1;const r=document.createElement("span");return r.textContent=e,i.append(n,r),i.onclick=()=>{h=t,u=0,d=!1,p=!1,v=!1,E(),S(),ve(!1)},i}))}function ve(a){const e=s("stepDropdown"),t=s("stepCounter"),i=s("stepPillArrow");if(!e)return;const n=a??e.hidden;e.hidden=!n,t.setAttribute("aria-expanded",String(n)),i.textContent=n?"✕":"▾",n&&e.querySelector("[aria-current]")?.scrollIntoView({block:"nearest"})}function S(){s("speed").textContent=`${z}×`,s("speed").setAttribute("aria-label",`Playback speed ${z} times. Change to ${z%3+1} times`);const a=c?.frames.length||0;s("stepPillText").textContent=c?`Step ${h+1}`:`${W||"Origami"}`,s("play").innerHTML=d&&!p?Y.pause:Y.play,s("play").setAttribute("aria-label",d&&!p?"Pause step":u===1?"Replay step":"Play step"),s("play").title=s("play").getAttribute?.("aria-label")||"Play step",s("play").setAttribute("aria-pressed",String(d&&!p)),s("playAll").innerHTML=d&&p?Y.pause:se('<path d="M5 12h14m-6-6 6 6-6 6"/>'),s("playAll").setAttribute("aria-label",d&&p?"Pause continuous playback":"Play all remaining steps"),s("playAll").title=d&&p?"Pause all":"Play all",s("playAll").setAttribute("aria-pressed",String(d&&p)),s("progress").value=Math.round(u*1e3),s("progress").style.setProperty("--fold-progress",`${u*100}%`),s("prev").disabled=!c||h===0,s("next").disabled=!c||h===a-1&&u===1,s("next").textContent=h===a-1?"Finish":"Next Step",document.querySelectorAll("#steps .step").forEach((e,t)=>{t===h?e.setAttribute("aria-current","step"):e.removeAttribute("aria-current")})}function Se(){v=!1,h<c.frames.length-1?(h++,u=0,d=!0):(d=!1,p=!1),E(),S()}s("play").onclick=()=>{if(!c)return;const a=p;p=!1,u===1&&(u=0),d=a||!d,d||(v=!1),E(),S()};s("stepCounter").onclick=()=>{c&&ve()};const V=matchMedia("(max-width:600px)");function Fe(a){document.body.classList.toggle("mobile-layout",a),document.body.classList.toggle("force-desktop",!a&&V.matches),s("mobileToggle").setAttribute("aria-pressed",String(a))}let G=null;s("mobileToggle").onclick=()=>{G=!document.body.classList.contains("mobile-layout"),Fe(G)};function Oe(){G===null&&Fe(V.matches)}V.addEventListener("change",()=>{Oe(),G!==null&&document.body.classList.toggle("force-desktop",!G&&V.matches)});Oe();s("speed").onclick=()=>{z=z%3+1,S()};s("playAll").onclick=()=>{if(c){if(d&&p){d=!1,p=!1,v=!1,S();return}if(p=!0,v=!1,u>=1){if(h<c.frames.length-1){Se();return}h=0,u=0}d=!0,E(),S()}};s("prev").onclick=()=>{!c||h===0||(w=null,h--,u=1,d=!1,p=!1,v=!1,E(),S())};s("next").onclick=()=>{if(c){if(u>=1){Se();return}v=!0,d=!0,S()}};s("progress").oninput=a=>{c&&(w=null,d=!1,p=!1,v=!1,u=Number(a.target.value)/1e3,E(),S())};const yt=["front","back","spatial"];function X(a,e){if(!l)return;w=null;const t=l.target,i=e??f.position.distanceTo(t);f.up.set(0,1,0),a==="front"?f.position.set(t.x,t.y,t.z+i):a==="back"&&f.position.set(t.x,t.y,t.z-i),l.minPolarAngle=Math.PI*.15,l.maxPolarAngle=Math.PI*.55,l.enableRotate=a==="spatial",l.update();for(const n of yt)s(n).setAttribute("aria-pressed",String(n===a));s("paper").setAttribute("aria-label",`${W||"Origami"} origami model, ${a} view. `+(a==="spatial"?"Drag to rotate; pinch or scroll to zoom.":"Pinch or scroll to zoom.")),y=!0}s("front").onclick=()=>X("front");s("back").onclick=()=>X("back");s("spatial").onclick=()=>X("spatial");for(const[a,e]of[["zoomIn",1/1.2],["zoomOut",1.2]])s(a).onclick=()=>{if(!l||!c)return;w=null;const t=f.position.clone().sub(l.target),i=O.clamp(t.length()*e,l.minDistance,l.maxDistance);f.position.copy(l.target).add(t.setLength(i)),l.update(),y=!0};function Et(a){const e=new re(a);return .2126*e.r+.7152*e.g+.0722*e.b>.72&&e.multiplyScalar(.42),"#"+e.getHexString()}function K(a=!1){const e=A;A=ae(Q,k),g&&(g.setTexture(A),g.setBackColor(N));for(const i of B.values())i.paper.setTexture(A),i.paper.setBackColor(N),i.dirty=!0;e.dispose();const t=Et(k);document.documentElement.style.setProperty("--control-accent",t),a&&document.documentElement.style.setProperty("--accent",t),document.querySelectorAll("[data-color]").forEach(i=>i.setAttribute("aria-pressed",String(i.dataset.color===k))),document.querySelectorAll("[data-back]").forEach(i=>i.setAttribute("aria-pressed",String(i.dataset.back.toLowerCase()===N.toLowerCase()))),document.querySelectorAll("[data-pattern]").forEach(i=>{i.setAttribute("aria-pressed",String(i.dataset.pattern===Q));const n=ae(i.dataset.pattern,k);i.querySelector(".pattern-preview").style.backgroundImage=`url(${n.image.toDataURL()})`,n.dispose()}),y=!0}function Ct(){const a=s("backSwatches");if(!a||a.dataset.built)return;a.dataset.built="1";const e=new Set(["#ffffff"]);for(const t of document.querySelectorAll("[data-color]")){const i=t.dataset.color.toLowerCase();if(e.has(i))continue;e.add(i);const n=document.createElement("button");n.className="back-choice",n.dataset.back=t.dataset.color,n.setAttribute("aria-label",t.getAttribute("aria-label")),n.setAttribute("aria-pressed","false");const r=document.createElement("span");r.className="swatch-circle",r.style.background=t.dataset.color;const o=document.createElement("span");o.textContent=t.getAttribute("aria-label"),n.append(r,o),a.appendChild(n)}}document.querySelectorAll("[data-color]").forEach(a=>a.onclick=()=>{k=a.dataset.color,K(!0)});document.querySelectorAll("[data-pattern]").forEach(a=>a.onclick=()=>{Q=a.dataset.pattern,K()});Ct();document.querySelectorAll("[data-back]").forEach(a=>a.onclick=()=>{N=a.dataset.back,K()});function _t(){const a=s("modelGrid");a.innerHTML="";for(const e of fe){const t=document.createElement("button");t.className="model-item",t.dataset.animal=e,t.setAttribute("aria-label",`${e} — preview finished model`);const i=document.createElement("canvas");i.className="model-preview",i.setAttribute("aria-hidden","true");const n=document.createElement("span");n.className="model-name",n.textContent=e,t.append(i,n),t.onclick=()=>Dt(e,t),a.append(t)}Be()}function Be(){document.querySelectorAll(".model-item").forEach(a=>{a.classList.toggle("selected",a.dataset.animal===W)})}let $=null;function Dt(a,e){e.classList.add("pumping"),document.querySelectorAll(".model-item").forEach(t=>{t!==e&&t.classList.add("faded")}),setTimeout(()=>Pt(a),380)}async function Pt(a){const e=s("appDialog");document.querySelectorAll(".panel-content>section").forEach(i=>i.hidden=i.id!=="panel-preview"),s("panelTitle").textContent=a,e.classList.add("preview-open"),document.body.classList.add("modal-open"),s("modalScrim").hidden=!1,e.open||e.showModal(),s("previewStart").onclick=()=>{ne(),H(),ge(a)},s("previewClose").onclick=()=>{ne(),ze("models")};const t=s("previewBig");try{const i=await me(a),n=new oe({canvas:t,alpha:!0,antialias:!0});n.setPixelRatio(Math.min(devicePixelRatio||1,2));const r=new le,o=new ce(36,1,.1,30),m=new de(i,A,{backColor:N}),x=m.update(ue(i,i.frames.length-1,1));r.add(m),he(r);const P=new Le().setFromObject(m),C=P.getSize(new j).length();o.position.copy(x).add(new j(.5,.35,1).normalize().multiplyScalar(Math.max(1,C*1.6)));const _=new pe(o,t);_.target.copy(x),_.enablePan=!1,_.update();const be=()=>{const L=t.getBoundingClientRect();L.width&&L.height&&(n.setSize(L.width,L.height,!1),o.aspect=L.width/L.height,o.updateProjectionMatrix())};be(),new ResizeObserver(be).observe(t);const xe=()=>{!e.open||s("panel-preview").hidden||(n.render(r,o),requestAnimationFrame(xe))};xe(),$={renderer:n,scene:r,camera:o,paper:m,controls:_}}catch(i){console.warn("Big preview unavailable:",a,i)}}function ne(){$&&($.renderer.dispose(),$=null),s("appDialog").classList.remove("preview-open"),document.querySelectorAll(".model-item").forEach(a=>a.classList.remove("pumping","faded"))}s("appDialog").addEventListener("close",()=>{ne()});let ee=!1,Ae;async function At(){if(!ee){ee=!0;for(const a of fe.filter(e=>!Re[e]))if(!B.has(a))try{const e=await me(a),t=document.querySelector(`[data-animal="${a}"] .model-preview`),i=Ae||(Ae=new oe({canvas:document.createElement("canvas"),alpha:!0,antialias:!0,preserveDrawingBuffer:!0}));i.setPixelRatio(Math.min(devicePixelRatio||1,1.5));const n=new le,r=new ce(36,1,.1,30),o=new de(e,A),m=o.update(ue(e,e.frames.length-1,1));n.add(o),he(n);const x=new Le().setFromObject(o),P=x.getSize(new j).length();r.position.copy(m).add(new j(e.cuts?.6:a.startsWith("Dinosaur")?.55:.48,e.cuts?-.6:a.startsWith("Dinosaur")?.25:.3,1).normalize().multiplyScalar(Math.max(1,P*1.55)));const C=new pe(r,t);C.target.copy(m),C.enablePan=!1,C.enableZoom=!1,C.update();const _={renderer:i,scene:n,camera:r,paper:o,controls:C,canvas:t,context:t.getContext("2d"),dirty:!0};C.addEventListener("change",()=>_.dirty=!0),B.set(a,_),new ResizeObserver(()=>_.dirty=!0).observe(t)}catch(e){console.warn(`Preview unavailable: ${a}`,e),document.querySelector(`[data-animal="${a}"] canvas`).setAttribute("aria-label",`${a} preview unavailable. Click to select.`)}ee=!1}}document.addEventListener("panel-open",a=>{if(w=null,d=!1,p=!1,v=!1,S(),a.detail==="models"){At();for(const e of B.values())e.dirty=!0}});function Ge(a){const e=J?Math.min((a-J)/1e3,.05):0;if(J=a,c&&!document.hidden){if(d&&!(w?.prepare&&u===0)){const t=c.motions?.[h],i=t?.type==="foundation"?c.foundation.motions[t.step]:t,n=i?.type==="cut"?12:i?.type==="panel-tree"||(i?.curve?.length||0)>1?7.2:5.6;u=Math.min(1,u+e*(v?3:z)/n),u===1&&(d=!1),E(),u===1&&(v||p)?Se():S()}if(w){const t=w;t.elapsed=Math.min(1,t.elapsed+e/t.duration);const i=t.elapsed,n=i*i*i*(i*(i*6-15)+10),r=O.lerp(t.from.length(),t.to.length(),n),o=t.from.clone().normalize(),m=t.to.clone().normalize(),x=new Ee().setFromUnitVectors(o,m),P=o.applyQuaternion(new Ee().slerp(x,n)).multiplyScalar(r);f.position.copy(l.target).add(P),l.update(),y=!0,t.elapsed===1&&(w=null)}}if(b&&y&&(T.render(),y=!1),s("appDialog").open&&!s("panel-models").hidden){for(const t of B.values())if(t.dirty){const i=t.canvas.getBoundingClientRect();if(i.width&&i.height){t.renderer.setSize(i.width,i.height,!1),t.camera.aspect=i.width/i.height,t.camera.updateProjectionMatrix(),t.renderer.render(t.scene,t.camera);const n=t.renderer.domElement;(t.canvas.width!==n.width||t.canvas.height!==n.height)&&(t.canvas.width=n.width,t.canvas.height=n.height),t.context.clearRect(0,0,t.canvas.width,t.canvas.height),t.context.drawImage(n,0,0),t.dirty=!1}}}requestAnimationFrame(Ge)}_t();K();S();ge(Ne);requestAnimationFrame(Ge);if(document.modelContext?.registerTool)try{Promise.resolve(document.modelContext.registerTool({name:"show_origami_step",description:"Show a paused folding step for the currently selected animal.",inputSchema:{type:"object",properties:{step:{type:"integer",minimum:1},progress:{type:"number",minimum:0,maximum:1}},required:["step","progress"],additionalProperties:!1},annotations:{readOnlyHint:!1},execute(a){if(!c||!a||!Number.isInteger(a.step)||a.step<1||a.step>c.frames.length||!Number.isFinite(a.progress)||a.progress<0||a.progress>1)throw Error("Invalid step or progress");return h=a.step-1,u=a.progress,d=!1,p=!1,v=!1,E(),S(),{step:h+1,progress:u,playing:d}}})).catch(console.error)}catch(a){console.error(a)}
