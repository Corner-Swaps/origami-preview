import{M as We,O as Xe,B as Ke,F as _e,S as Ee,U as Oe,V as ae,W as Ye,H as Ze,N as Je,C as et,a as le,R as tt,b as at,c as it,L as st,d as nt,e as rt,A as lt,f as ot,g as ct,h as dt,m as ie,i as oe,j as ce,P as de,k as ue,s as pe,l as Be,n as b,o as fe,p as B,Q as Ce,v as ut,q as pt,D as De,r as ft}from"./patterns-CgFWMmPm.js";const ht={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class q{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const mt=new Xe(-1,1,1,-1,0,1);class gt extends Ke{constructor(){super(),this.setAttribute("position",new _e([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new _e([0,2,0,0,2,0],2))}}const vt=new gt;class Ge{constructor(e){this._mesh=new We(vt,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,mt)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Ie extends q{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Ee?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Oe.clone(e.uniforms),this.material=new Ee({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Ge(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Pe extends q{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const n=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let l,p;this.inverse?(l=0,p=1):(l=1,p=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(n.REPLACE,n.REPLACE,n.REPLACE),r.buffers.stencil.setFunc(n.ALWAYS,l,4294967295),r.buffers.stencil.setClear(p),r.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(n.EQUAL,1,4294967295),r.buffers.stencil.setOp(n.KEEP,n.KEEP,n.KEEP),r.buffers.stencil.setLocked(!0)}}class St extends q{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class xt{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new ae);this._width=i.width,this._height=i.height,t=new Ye(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Ze}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Ie(ht),this.copyPass.material.blending=Je,this.clock=new et}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let n=0,r=this.passes.length;n<r;n++){const l=this.passes[n];if(l.enabled!==!1){if(l.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(n),l.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),l.needsSwap){if(i){const p=this.renderer.getContext(),y=this.renderer.state.buffers.stencil;y.setFunc(p.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),y.setFunc(p.EQUAL,1,4294967295)}this.swapBuffers()}Pe!==void 0&&(l instanceof Pe?i=!0:l instanceof St&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new ae);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,n=this._height*this._pixelRatio;this.renderTarget1.setSize(i,n),this.renderTarget2.setSize(i,n);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,n)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class wt extends q{constructor(e,t,i=null,n=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=n,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new le}render(e,t,i){const n=e.autoClear;e.autoClear=!1;let r,l;this.overrideMaterial!==null&&(l=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=l),e.autoClear=n}}const bt={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new ae(1/1024,1/512)}},vertexShader:`

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

		}`},H={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class yt extends q{constructor(){super(),this.uniforms=Oe.clone(H.uniforms),this.material=new tt({name:H.name,uniforms:this.uniforms,vertexShader:H.vertexShader,fragmentShader:H.fragmentShader}),this._fsQuad=new Ge(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},at.getTransfer(this._outputColorSpace)===it&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===st?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===nt?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===rt?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===lt?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===ot?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===ct?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===dt&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const he=["Frog","Crane","Whale","Butterfly"],Ue={},_t=[],T=a=>document.getElementById(a),A=T("appDialog");let se;function j(){A.open&&A.close(),document.body.classList.remove("modal-open"),T("modalScrim").hidden=!0,document.querySelectorAll("#menu button").forEach(a=>{a.removeAttribute("aria-current")}),T("menu").style.setProperty("--active-tab",-1)}function qe(a){se=document.activeElement,document.querySelectorAll(".panel-content>section").forEach(t=>t.hidden=t.id!==`panel-${a}`),T("panelTitle").textContent={color:"Paper color",paper:"Paper texture",models:"Origami library",thanks:"Thanks"}[a],document.body.classList.add("modal-open"),T("modalScrim").hidden=!1,A.open||A.showModal();const e={color:0,paper:1,models:2,thanks:3}[a];e!==void 0&&(T("menu").style.setProperty("--active-tab",e),document.querySelectorAll("#menu button").forEach((t,i)=>{t.toggleAttribute("aria-current",i===e)})),document.dispatchEvent(new CustomEvent("panel-open",{detail:a}))}function Et(){document.querySelectorAll("[data-panel]").forEach(a=>a.addEventListener("click",()=>qe(a.dataset.panel))),T("closePanel").onclick=j,A.addEventListener("close",()=>{j(),se?.isConnected&&se.focus()}),A.addEventListener("click",a=>{if(a.target!==A)return;const e=A.getBoundingClientRect();(a.clientX<e.left||a.clientX>e.right||a.clientY<e.top||a.clientY>e.bottom)&&j()})}const s=a=>document.getElementById(a),ne=a=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${a}</svg>`,Z={play:ne('<path d="m8 5 11 7-11 7z"/>'),pause:ne('<path d="M8 5v14M16 5v14"/>')},Me=new URLSearchParams(document.location?.search||"").get("animal"),He=he.includes(Me)?Me:"Crane";let K=He,c,m=0,u=0,d=!1,f=!1,x=!1,F=0,M=1,J=0,z="#087b96",W="solid",L=ie(W,z),Ae=null,C=null,w,N,h,o,v,k,E=!0,ee=0;const $=new Map,G=new Map;Et();function me(a,e=!1){a.add(new pt(16777215,7899549,1.5));const t=new De(16774887,2.5);t.position.set(-3.5,4,5),t.castShadow=e,e&&(t.shadow.mapSize.set(2048,2048),Object.assign(t.shadow.camera,{left:-3,right:3,top:3,bottom:-3,near:.1,far:20}),t.shadow.intensity=.12,t.shadow.bias=-3e-4,t.shadow.normalBias=.008),a.add(t);const i=new De(13031926,.95);i.position.set(3,-1,-5),a.add(i)}function Ct(){w=new oe({canvas:s("paper"),antialias:!0}),w.setPixelRatio(Math.min(devicePixelRatio||1,2)),w.shadowMap.enabled=!0,w.shadowMap.autoUpdate=!1,w.shadowMap.needsUpdate=!0,w.shadowMap.type=ft,N=new ce,N.background=new le("#ffffff"),h=new de(36,1,.1,30),h.position.set(.5,3.2,4.2),o=new fe(h,s("paper")),o.enablePan=!1,o.zoomToCursor=!1,o.minDistance=1.5,o.maxDistance=12,o.maxPolarAngle=Math.PI*.55,o.minPolarAngle=Math.PI*.15,o.addEventListener("change",()=>E=!0),o.addEventListener("start",()=>{C=null}),me(N,!1),k=new xt(w),k.addPass(new wt(N,h)),k.addPass(new yt);const a=new Ie(bt);k.addPass(a);const e=()=>{const t=s("paper").getBoundingClientRect();if(!t.width||!t.height)return;w.setSize(t.width,t.height,!1),h.aspect=t.width/t.height,h.updateProjectionMatrix(),k.setSize(t.width,t.height);const i=w.getPixelRatio();a.uniforms.resolution.value.set(1/(t.width*i),1/(t.height*i)),E=!0};new ResizeObserver(e).observe(s("paper")),e(),s("paper").addEventListener("webglcontextlost",t=>{t.preventDefault(),d=!1,f=!1,x=!1,O("3D view interrupted","Reload this page to restore the graphics view.")})}async function ge(a){if($.has(a))return $.get(a);const e=(async()=>{const t=await fetch(a==="Crane"?"./crane-motion.json":`./models/${a.toLowerCase()}.json`);if(!t.ok)throw Error("Model unavailable");const i=await t.json();if(ut(i,a),i.complete!==!0)throw Error("Folding lesson is incomplete");return i})();$.set(a,e);try{return await e}catch(t){throw $.delete(a),t}}function O(a,e,t){s("modelMessage").hidden=!1,s("messageTitle").textContent=a,s("messageText").textContent=e,s("referenceLink").hidden=!0,s("playback").hidden=!0,s("stepPillWrap").hidden=!0,Se(!1)}function Dt(){C=null,I=null,v&&(N.remove(v),v.dispose(),v=null),c=null,d=!1,f=!1,x=!1,s("steps").replaceChildren(),E=!0}async function ve(a,e="default"){const t=++J;if(Ae?.(),Ae=null,s("appSurface").style.minHeight="",s("videoLesson").hidden=!0,s("paper").hidden=!1,s("viewControls").hidden=!1,s("front").hidden=!1,s("back").hidden=!1,s("spatial").hidden=!1,s("menuColor").disabled=!1,s("menuPaper").disabled=!1,s("retry").hidden=!0,K=a,document.title=a?`${a} — Origami`:"Origami",je(),w&&Dt(),!a){s("paper").setAttribute("aria-label","Origami workspace"),O("Choose a model","Select a tutorial from Models to begin.");return}if(Ue[a]){s("viewControls").hidden=!0,O(a,"The native 3D folding sequence is not ready yet. This animal cannot currently be folded in the app.");return}O("Loading…","");try{const i=await ge(a);if(t!==J)return;w||Ct(),c=i,m=0,u=0,d=!1,f=!1,x=!1,v=new ue(c,L),v.rotation.set(Math.PI,Math.PI,0),N.add(v),o.target.set(0,0,0),Y("front",2),s("modelMessage").hidden=!0,s("playback").hidden=!1,s("stepPillWrap").hidden=!1,Lt(),P(),S()}catch(i){if(t!==J)return;console.error(i),O("Unable to show the 3D model",/WebGL|context/i.test(i.message)?"3D graphics are unavailable in this browser. Try a browser with graphics acceleration enabled.":"The model could not load. Please try again."),s("retry").hidden=!1,s("retry").onclick=()=>{s("retry").hidden=!0,ve(a)}}}function Pt(){return c.surfaceMarks&&m===c.frames.length-1&&u===1?[]:[...new Set(c.activeEdges.slice(0,m+(u>=1?1:0)).flat())]}let I=null;const V=new b;function Mt(a){if(!I||!h||!o||!c)return;const e=1-Math.exp(-a*5);V.copy(I).sub(o.target).multiplyScalar(e),!(V.lengthSq()<1e-12)&&(o.target.add(V),h.position.add(V),o.update(),E=!0)}function At(){if(!v||!h||!o||!c||!v.geometry.boundingSphere)return;const a=v.geometry.boundingSphere,e=o.target,t=a.radius,i=Math.tan(B.degToRad(h.fov/2)),n=Math.min(i,i*h.aspect);if(!(n>0))return;const r=B.clamp(t/n*1.03,o.minDistance,o.maxDistance),l=h.position.distanceTo(e);if(l<r-1e-6){const p=h.position.clone().sub(e).normalize();h.position.copy(e).addScaledVector(p,B.lerp(l,r,.25)),o.update(),E=!0}}function P(){if(!v||!c)return;const a=pe(c,m,u);v.updateMatrixWorld(!0);const e=new b,t=new b,i=new b,n=new b,r=new b,l=new b,p=new b,y=new b;let D=0;for(const g of c.faces){e.set(a[g[0]][0],a[g[0]][1],a[g[0]][2]),t.set(a[g[1]][0],a[g[1]][1],a[g[1]][2]),i.set(a[g[2]][0],a[g[2]][1],a[g[2]][2]),n.subVectors(t,e),r.subVectors(i,e),p.crossVectors(n,r);const _=p.length()/2;_>1e-12&&(l.set(0,0,0).add(e).add(t).add(i).multiplyScalar(1/3),y.addScaledVector(l,_),D+=_)}I=D>1e-12?y.multiplyScalar(1/D).applyMatrix4(v.matrixWorld):I,v.update(a,Pt(),u<1?c.activeEdges[m]:[]),At(),w.shadowMap.needsUpdate=!0,E=!0}function Lt(){const a=c.titles||_t;s("steps").replaceChildren(...a.map((e,t)=>{const i=document.createElement("button");i.className="step",i.dataset.step=t,i.setAttribute("role","option");const n=document.createElement("span");n.className="number",n.textContent=t+1;const r=document.createElement("span");return r.textContent=e,i.append(n,r),i.onclick=()=>{m=t,u=0,d=!1,f=!1,x=!1,P(),S(),Se(!1)},i}))}function Se(a){const e=s("stepDropdown"),t=s("stepCounter"),i=s("stepPillArrow");if(!e)return;const n=a??e.hidden;e.hidden=!n,t.setAttribute("aria-expanded",String(n)),i.textContent=n?"✕":"▾",n&&e.querySelector("[aria-current]")?.scrollIntoView({block:"nearest"})}let Le=0,Te="",Re=null,ke=null,ze="",Ne=null;function S(){M!==Le&&(Le=M,s("speed").textContent=`${M}×`,s("speed").setAttribute("aria-label",`Playback speed ${M} times. Change to ${M%3+1} times`));const a=c?.frames.length||0,e=c?`Step ${m+1}`:`${K||"Origami"}`;e!==Te&&(Te=e,s("stepPillText").textContent=e);const t=d&&!f?Z.pause:Z.play;t!==Re&&(Re=t,s("play").innerHTML=t),s("play").setAttribute("aria-label",d&&!f?"Pause step":u===1?"Replay step":"Play step"),s("play").title=s("play").getAttribute?.("aria-label")||"Play step",s("play").setAttribute("aria-pressed",String(d&&!f));const i=d&&f?Z.pause:ne('<path d="M5 12h14m-6-6 6 6-6 6"/>');i!==ke&&(ke=i,s("playAll").innerHTML=i),s("playAll").setAttribute("aria-label",d&&f?"Pause continuous playback":"Play all remaining steps"),s("playAll").title=d&&f?"Pause all":"Play all",s("playAll").setAttribute("aria-pressed",String(d&&f)),s("progress").value=Math.round(u*1e3),s("progress").style.setProperty("--fold-progress",`${u*100}%`);const n=!c||m===0;n!==Ne&&(Ne=n,s("prev").disabled=n);const r=m===a-1?"Finish":"Next Step";r!==ze&&(ze=r,s("next").textContent=r),s("next").disabled=!c||m===a-1&&u===1,document.querySelectorAll("#steps .step").forEach((l,p)=>{p===m?l.setAttribute("aria-current","step"):l.removeAttribute("aria-current")})}function xe(){F=0,x=!1,m<c.frames.length-1?(m++,u=0,d=!0):(d=!1,f=!1),P(),S()}s("play").onclick=()=>{if(!c)return;const a=f;f=!1,u===1&&(u=0),d=a||!d,d||(x=!1),P(),S()};s("stepCounter").onclick=()=>{c&&Se()};const X=matchMedia("(max-width:600px)");function $e(a){document.body.classList.toggle("mobile-layout",a),document.body.classList.toggle("force-desktop",!a&&X.matches),s("mobileToggle").setAttribute("aria-pressed",String(a))}let U=null;s("mobileToggle").onclick=()=>{U=!document.body.classList.contains("mobile-layout"),$e(U)};function Ve(){U===null&&$e(X.matches)}X.addEventListener("change",()=>{Ve(),U!==null&&document.body.classList.toggle("force-desktop",!U&&X.matches)});Ve();s("speed").onclick=()=>{M=M%3+1,S()};s("playAll").onclick=()=>{if(c){if(d&&f){d=!1,f=!1,x=!1,S();return}if(f=!0,x=!1,u>=1){if(m<c.frames.length-1){xe();return}m=0,u=0}d=!0,P(),S()}};s("prev").onclick=()=>{!c||m===0||(C=null,m--,u=1,d=!1,f=!1,x=!1,P(),S())};s("next").onclick=()=>{if(c){if(u>=1){xe();return}x=!0,d=!0,S()}};s("progress").oninput=a=>{c&&(C=null,d=!1,f=!1,x=!1,u=Number(a.target.value)/1e3,P(),S())};const Tt=["front","back","spatial"];function Y(a,e){if(!o)return;C=null;const t=o.target,i=e??h.position.distanceTo(t);h.up.set(0,1,0),a==="front"?h.position.set(t.x,t.y,t.z+i):a==="back"&&h.position.set(t.x,t.y,t.z-i),o.minPolarAngle=Math.PI*.15,o.maxPolarAngle=Math.PI*.55,o.enableRotate=a==="spatial",o.update();for(const n of Tt)s(n).setAttribute("aria-pressed",String(n===a));s("paper").setAttribute("aria-label",`${K||"Origami"} origami model, ${a} view. `+(a==="spatial"?"Drag to rotate; pinch or scroll to zoom.":"Pinch or scroll to zoom.")),E=!0}s("front").onclick=()=>Y("front");s("back").onclick=()=>Y("back");s("spatial").onclick=()=>Y("spatial");for(const[a,e]of[["zoomIn",1/1.2],["zoomOut",1.2]])s(a).onclick=()=>{if(!o||!c)return;C=null;const t=h.position.clone().sub(o.target),i=B.clamp(t.length()*e,o.minDistance,o.maxDistance);h.position.copy(o.target).add(t.setLength(i)),o.update(),E=!0};function Rt(a){const e=new le(a);return .2126*e.r+.7152*e.g+.0722*e.b>.72&&e.multiplyScalar(.42),"#"+e.getHexString()}function we(a=!1){const e=L;L=ie(W,z),v&&v.setTexture(L);for(const i of G.values())i.paper.setTexture(L),i.dirty=!0;e.dispose();const t=Rt(z);document.documentElement.style.setProperty("--control-accent",t),a&&document.documentElement.style.setProperty("--accent",t),document.querySelectorAll("[data-color]").forEach(i=>i.setAttribute("aria-pressed",String(i.dataset.color===z))),document.querySelectorAll("[data-pattern]").forEach(i=>{i.setAttribute("aria-pressed",String(i.dataset.pattern===W));const n=ie(i.dataset.pattern,z);i.querySelector(".pattern-preview").style.backgroundImage=`url(${n.image.toDataURL()})`,n.dispose()}),E=!0}document.querySelectorAll("[data-color]").forEach(a=>a.onclick=()=>{z=a.dataset.color,we(!0)});document.querySelectorAll("[data-pattern]").forEach(a=>a.onclick=()=>{W=a.dataset.pattern,we()});function kt(){const a=s("modelGrid");a.innerHTML="";for(const e of he){const t=document.createElement("button");t.className="model-item",t.dataset.animal=e,t.setAttribute("aria-label",`${e} — preview finished model`);const i=document.createElement("canvas");i.className="model-preview",i.setAttribute("aria-hidden","true");const n=document.createElement("span");n.className="model-name",n.textContent=e,t.append(i,n),t.onclick=()=>zt(e,t),a.append(t)}je()}function je(){document.querySelectorAll(".model-item").forEach(a=>{a.classList.toggle("selected",a.dataset.animal===K)})}let Q=null;function zt(a,e){e.classList.add("pumping"),document.querySelectorAll(".model-item").forEach(t=>{t!==e&&t.classList.add("faded")}),setTimeout(()=>Nt(a),380)}async function Nt(a){const e=s("appDialog");document.querySelectorAll(".panel-content>section").forEach(i=>i.hidden=i.id!=="panel-preview"),s("panelTitle").textContent=a,e.classList.add("preview-open"),document.body.classList.add("modal-open"),s("modalScrim").hidden=!1,e.open||e.showModal(),s("previewStart").onclick=()=>{re(),j(),ve(a)},s("previewClose").onclick=()=>{re(),qe("models")};const t=s("previewBig");try{const i=await ge(a),n=new oe({canvas:t,alpha:!0,antialias:!0});n.setPixelRatio(Math.min(devicePixelRatio||1,2));const r=new ce,l=new de(36,1,.1,30),p=new ue(i,L),y=p.update(pe(i,i.frames.length-1,1));r.add(p),me(r);const D=new Be().setFromObject(p),g=D.getSize(new b).length();l.position.copy(y).add(new b(.5,.35,1).normalize().multiplyScalar(Math.max(1,g*1.6)));const _=new fe(l,t);_.target.copy(y),_.enablePan=!1,_.update();const be=()=>{const R=t.getBoundingClientRect();R.width&&R.height&&(n.setSize(R.width,R.height,!1),l.aspect=R.width/R.height,l.updateProjectionMatrix())};be(),new ResizeObserver(be).observe(t);const ye=()=>{!e.open||s("panel-preview").hidden||(n.render(r,l),requestAnimationFrame(ye))};ye(),Q={renderer:n,scene:r,camera:l,paper:p,controls:_}}catch(i){console.warn("Big preview unavailable:",a,i)}}function re(){Q&&(Q.renderer.dispose(),Q=null),s("appDialog").classList.remove("preview-open"),document.querySelectorAll(".model-item").forEach(a=>a.classList.remove("pumping","faded"))}s("appDialog").addEventListener("close",()=>{re()});let te=!1,Fe;async function Ft(){if(!te){te=!0;for(const a of he.filter(e=>!Ue[e]))if(!G.has(a))try{const e=await ge(a),t=document.querySelector(`[data-animal="${a}"] .model-preview`),i=Fe||(Fe=new oe({canvas:document.createElement("canvas"),alpha:!0,antialias:!0,preserveDrawingBuffer:!0}));i.setPixelRatio(Math.min(devicePixelRatio||1,1.5));const n=new ce,r=new de(36,1,.1,30),l=new ue(e,L),p=l.update(pe(e,e.frames.length-1,1));n.add(l),me(n);const y=new Be().setFromObject(l),D=y.getSize(new b).length();r.position.copy(p).add(new b(e.cuts?.6:a.startsWith("Dinosaur")?.55:.48,e.cuts?-.6:a.startsWith("Dinosaur")?.25:.3,1).normalize().multiplyScalar(Math.max(1,D*1.55)));const g=new fe(r,t);g.target.copy(p),g.enablePan=!1,g.enableZoom=!1,g.update();const _={renderer:i,scene:n,camera:r,paper:l,controls:g,canvas:t,context:t.getContext("2d"),dirty:!0};g.addEventListener("change",()=>_.dirty=!0),G.set(a,_),new ResizeObserver(()=>_.dirty=!0).observe(t)}catch(e){console.warn(`Preview unavailable: ${a}`,e),document.querySelector(`[data-animal="${a}"] canvas`).setAttribute("aria-label",`${a} preview unavailable. Click to select.`)}te=!1}}document.addEventListener("panel-open",a=>{if(C=null,d=!1,f=!1,x=!1,S(),a.detail==="models"){Ft();for(const e of G.values())e.dirty=!0}});function Qe(a){const e=ee?Math.min((a-ee)/1e3,.05):0;if(ee=a,c&&!document.hidden){if(d&&!(C?.prepare&&u===0)){const t=c.motions?.[m],i=t?.type==="foundation"?c.foundation.motions[t.step]:t,n=i?.type==="cut"?12:i?.type==="panel-tree"||(i?.curve?.length||0)>1?7.2:5.6;u=Math.min(1,u+e*M/n),u===1&&(d=!1),P(),u===1&&(x||f)&&(F=a+500),S()}if(F&&a>=F&&!d&&(F=0,x||f?xe():S()),Mt(e),C){const t=C;t.elapsed=Math.min(1,t.elapsed+e/t.duration);const i=t.elapsed,n=i*i*i*(i*(i*6-15)+10),r=B.lerp(t.from.length(),t.to.length(),n),l=t.from.clone().normalize(),p=t.to.clone().normalize(),y=new Ce().setFromUnitVectors(l,p),D=l.applyQuaternion(new Ce().slerp(y,n)).multiplyScalar(r);h.position.copy(o.target).add(D),o.update(),E=!0,t.elapsed===1&&(C=null)}}if(w&&E&&(k.render(),E=!1),s("appDialog").open&&!s("panel-models").hidden){for(const t of G.values())if(t.dirty){const i=t.canvas.getBoundingClientRect();if(i.width&&i.height){t.renderer.setSize(i.width,i.height,!1),t.camera.aspect=i.width/i.height,t.camera.updateProjectionMatrix(),t.renderer.render(t.scene,t.camera);const n=t.renderer.domElement;(t.canvas.width!==n.width||t.canvas.height!==n.height)&&(t.canvas.width=n.width,t.canvas.height=n.height),t.context.clearRect(0,0,t.canvas.width,t.canvas.height),t.context.drawImage(n,0,0),t.dirty=!1}}}requestAnimationFrame(Qe)}kt();we();S();ve(He);requestAnimationFrame(Qe);if(document.modelContext?.registerTool)try{Promise.resolve(document.modelContext.registerTool({name:"show_origami_step",description:"Show a paused folding step for the currently selected animal.",inputSchema:{type:"object",properties:{step:{type:"integer",minimum:1},progress:{type:"number",minimum:0,maximum:1}},required:["step","progress"],additionalProperties:!1},annotations:{readOnlyHint:!1},execute(a){if(!c||!a||!Number.isInteger(a.step)||a.step<1||a.step>c.frames.length||!Number.isFinite(a.progress)||a.progress<0||a.progress>1)throw Error("Invalid step or progress");return m=a.step-1,u=a.progress,d=!1,f=!1,x=!1,P(),S(),{step:m+1,progress:u,playing:d}}})).catch(console.error)}catch(a){console.error(a)}
