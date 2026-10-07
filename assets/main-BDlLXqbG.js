import{M as Ke,O as Ye,B as Ze,F as Ce,S as De,U as Ge,V as ae,W as Je,H as et,N as tt,C as at,a as de,R as it,b as st,c as nt,L as rt,d as ot,e as lt,A as ct,f as dt,g as ut,h as pt,m as ie,i as ue,j as pe,P as fe,k as he,s as N,l as Ie,n as _,o as me,p as B,Q as Pe,v as ft,q as ht,D as Me,r as mt}from"./patterns-Bpgas2SO.js";const gt={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class q{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const vt=new Ye(-1,1,1,-1,0,1);class St extends Ze{constructor(){super(),this.setAttribute("position",new Ce([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ce([0,2,0,0,2,0],2))}}const xt=new St;class Ue{constructor(e){this._mesh=new Ke(xt,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,vt)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class qe extends q{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof De?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Ge.clone(e.uniforms),this.material=new De({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Ue(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Ae extends q{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const n=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,d;this.inverse?(o=0,d=1):(o=1,d=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(n.REPLACE,n.REPLACE,n.REPLACE),r.buffers.stencil.setFunc(n.ALWAYS,o,4294967295),r.buffers.stencil.setClear(d),r.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(n.EQUAL,1,4294967295),r.buffers.stencil.setOp(n.KEEP,n.KEEP,n.KEEP),r.buffers.stencil.setLocked(!0)}}class wt extends q{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class bt{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new ae);this._width=i.width,this._height=i.height,t=new Je(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:et}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new qe(gt),this.copyPass.material.blending=tt,this.clock=new at}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let n=0,r=this.passes.length;n<r;n++){const o=this.passes[n];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(n),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),o.needsSwap){if(i){const d=this.renderer.getContext(),v=this.renderer.state.buffers.stencil;v.setFunc(d.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),v.setFunc(d.EQUAL,1,4294967295)}this.swapBuffers()}Ae!==void 0&&(o instanceof Ae?i=!0:o instanceof wt&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new ae);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,n=this._height*this._pixelRatio;this.renderTarget1.setSize(i,n),this.renderTarget2.setSize(i,n);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,n)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class yt extends q{constructor(e,t,i=null,n=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=n,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new de}render(e,t,i){const n=e.autoClear;e.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=n}}const _t={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new ae(1/1024,1/512)}},vertexShader:`

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

		}`};class Et extends q{constructor(){super(),this.uniforms=Ge.clone(H.uniforms),this.material=new it({name:H.name,uniforms:this.uniforms,vertexShader:H.vertexShader,fragmentShader:H.fragmentShader}),this._fsQuad=new Ue(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},st.getTransfer(this._outputColorSpace)===nt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===rt?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===ot?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===lt?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===ct?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===dt?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===ut?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===pt&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const ge=["Frog","Crane","Whale","Butterfly"],He={},Ct=[],T=a=>document.getElementById(a),A=T("appDialog");let se;function j(){A.open&&A.close(),document.body.classList.remove("modal-open"),T("modalScrim").hidden=!0,document.querySelectorAll("#menu button").forEach(a=>{a.removeAttribute("aria-current")}),T("menu").style.setProperty("--active-tab",-1)}function $e(a){se=document.activeElement,document.querySelectorAll(".panel-content>section").forEach(t=>t.hidden=t.id!==`panel-${a}`),T("panelTitle").textContent={color:"Paper color",paper:"Paper texture",models:"Origami library",thanks:"Thanks"}[a],document.body.classList.add("modal-open"),T("modalScrim").hidden=!1,A.open||A.showModal();const e={color:0,paper:1,models:2,thanks:3}[a];e!==void 0&&(T("menu").style.setProperty("--active-tab",e),document.querySelectorAll("#menu button").forEach((t,i)=>{t.toggleAttribute("aria-current",i===e)})),document.dispatchEvent(new CustomEvent("panel-open",{detail:a}))}function Dt(){document.querySelectorAll("[data-panel]").forEach(a=>a.addEventListener("click",()=>$e(a.dataset.panel))),T("closePanel").onclick=j,A.addEventListener("close",()=>{j(),se?.isConnected&&se.focus()}),A.addEventListener("click",a=>{if(a.target!==A)return;const e=A.getBoundingClientRect();(a.clientX<e.left||a.clientX>e.right||a.clientY<e.top||a.clientY>e.bottom)&&j()})}const s=a=>document.getElementById(a),ne=a=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${a}</svg>`,Z={play:ne('<path d="m8 5 11 7-11 7z"/>'),pause:ne('<path d="M8 5v14M16 5v14"/>')},Le=new URLSearchParams(document.location?.search||"").get("animal"),Ve=ge.includes(Le)?Le:"Crane";let K=Ve,l,f=0,u=0,p=!1,m=!1,x=!1,M=1,J=0,z="#087b96",W="solid",L=ie(W,z),Te=null,D=null,y,F,g,c,h,k,C=!0,ee=0;const $=new Map,G=new Map;Dt();function ve(a,e=!1){a.add(new ht(16777215,7899549,1.5));const t=new Me(16774887,2.5);t.position.set(-3.5,4,5),t.castShadow=e,e&&(t.shadow.mapSize.set(2048,2048),Object.assign(t.shadow.camera,{left:-3,right:3,top:3,bottom:-3,near:.1,far:20}),t.shadow.intensity=.12,t.shadow.bias=-3e-4,t.shadow.normalBias=.008),a.add(t);const i=new Me(13031926,.95);i.position.set(3,-1,-5),a.add(i)}function Pt(){y=new ue({canvas:s("paper"),antialias:!0}),y.setPixelRatio(Math.min(devicePixelRatio||1,2)),y.shadowMap.enabled=!0,y.shadowMap.autoUpdate=!1,y.shadowMap.needsUpdate=!0,y.shadowMap.type=mt,F=new pe,F.background=new de("#ffffff"),g=new fe(36,1,.1,30),g.position.set(.5,3.2,4.2),c=new me(g,s("paper")),c.enablePan=!1,c.zoomToCursor=!1,c.minDistance=1.5,c.maxDistance=12,c.maxPolarAngle=Math.PI*.55,c.minPolarAngle=Math.PI*.15,c.addEventListener("change",()=>C=!0),c.addEventListener("start",()=>{D=null}),ve(F,!1),k=new bt(y),k.addPass(new yt(F,g)),k.addPass(new Et);const a=new qe(_t);k.addPass(a);const e=()=>{const t=s("paper").getBoundingClientRect();if(!t.width||!t.height)return;y.setSize(t.width,t.height,!1),g.aspect=t.width/t.height,g.updateProjectionMatrix(),k.setSize(t.width,t.height);const i=y.getPixelRatio();a.uniforms.resolution.value.set(1/(t.width*i),1/(t.height*i)),C=!0};new ResizeObserver(e).observe(s("paper")),e(),s("paper").addEventListener("webglcontextlost",t=>{t.preventDefault(),p=!1,m=!1,x=!1,O("3D view interrupted","Reload this page to restore the graphics view.")})}async function Se(a){if($.has(a))return $.get(a);const e=(async()=>{const t=await fetch(a==="Crane"?"./crane-motion.json":`./models/${a.toLowerCase()}.json`);if(!t.ok)throw Error("Model unavailable");const i=await t.json();if(ft(i,a),i.complete!==!0)throw Error("Folding lesson is incomplete");return i})();$.set(a,e);try{return await e}catch(t){throw $.delete(a),t}}function O(a,e,t){s("modelMessage").hidden=!1,s("messageTitle").textContent=a,s("messageText").textContent=e,s("referenceLink").hidden=!0,s("playback").hidden=!0,s("stepPillWrap").hidden=!0,we(!1)}function Mt(){D=null,re=-1,oe=null,I=null,le=-1,h&&(F.remove(h),h.dispose(),h=null),l=null,p=!1,m=!1,x=!1,s("steps").replaceChildren(),C=!0}async function xe(a,e="default"){const t=++J;if(Te?.(),Te=null,s("appSurface").style.minHeight="",s("videoLesson").hidden=!0,s("paper").hidden=!1,s("viewControls").hidden=!1,s("front").hidden=!1,s("back").hidden=!1,s("spatial").hidden=!1,s("menuColor").disabled=!1,s("menuPaper").disabled=!1,s("retry").hidden=!0,K=a,document.title=a?`${a} — Origami`:"Origami",We(),y&&Mt(),!a){s("paper").setAttribute("aria-label","Origami workspace"),O("Choose a model","Select a tutorial from Models to begin.");return}if(He[a]){s("viewControls").hidden=!0,O(a,"The native 3D folding sequence is not ready yet. This animal cannot currently be folded in the app.");return}O("Loading…","");try{const i=await Se(a);if(t!==J)return;y||Pt(),l=i,f=0,u=0,p=!1,m=!1,x=!1,h=new he(l,L),h.rotation.set(Math.PI,Math.PI,0),F.add(h),c.target.set(0,0,0),Y("front",2),s("modelMessage").hidden=!0,s("playback").hidden=!1,s("stepPillWrap").hidden=!1,zt(),P(),w()}catch(i){if(t!==J)return;console.error(i),O("Unable to show the 3D model",/WebGL|context/i.test(i.message)?"3D graphics are unavailable in this browser. Try a browser with graphics acceleration enabled.":"The model could not load. Please try again."),s("retry").hidden=!1,s("retry").onclick=()=>{s("retry").hidden=!0,xe(a)}}}function At(){return l.surfaceMarks&&f===l.frames.length-1&&u===1?[]:[...new Set(l.activeEdges.slice(0,f+(u>=1?1:0)).flat())]}let re=-1,oe=null,I=null,le=-1;function Lt(){if(!h||!l||l.cuts)return;if(f===le){h.ghost&&(h.ghost.visible=h.ghostFaceCount>0&&u<.98);return}le=f;const a=N(l,f,0),e=N(l,f,1);let t=0;const i=new Array(a.length);for(let r=0;r<a.length;r++){const o=a[r],d=e[r],v=Math.hypot(d[0]-o[0],d[1]-o[1],d[2]-o[2]);i[r]=v,v>t&&(t=v)}const n=t>1e-9?l.faces.map((r,o)=>o).filter(r=>{const o=l.faces[r];return(i[o[0]]+i[o[1]]+i[o[2]])/3>t*.25}):[];h.setGhost(e,n),h.ghost&&(h.ghost.visible=h.ghostFaceCount>0&&u<.98)}const V=new _;function Tt(a){if(!I||!g||!c||!l)return;const e=1-Math.exp(-a*5);V.copy(I).sub(c.target).multiplyScalar(e),!(V.lengthSq()<1e-12)&&(c.target.add(V),g.position.add(V),c.update(),C=!0)}function Rt(){if(!h||!g||!c||!l||!h.geometry.boundingSphere)return;const a=h.geometry.boundingSphere,e=c.target,t=a.radius,i=Math.tan(B.degToRad(g.fov/2)),n=Math.min(i,i*g.aspect);if(!(n>0))return;const r=B.clamp(t/n*1.03,c.minDistance,c.maxDistance),o=g.position.distanceTo(e);if(o<r-1e-6){const d=g.position.clone().sub(e).normalize();g.position.copy(e).addScaledVector(d,B.lerp(o,r,.25)),c.update(),C=!0}}function kt(a){re!==f&&(re=f,oe=N(l,f,0));const e=oe;if(!e||e.length!==a.length||u<=0||u>=1)return null;const t=a.length,i=new Array(t);let n=0;for(let r=0;r<t;r++){const o=a[r][0]-e[r][0],d=a[r][1]-e[r][1],v=a[r][2]-e[r][2],b=Math.sqrt(o*o+d*d+v*v);i[r]=b,b>n&&(n=b)}if(n<1e-9)return null;for(let r=0;r<t;r++)i[r]=Math.min(1,i[r]/n);return i}function P(){if(!h||!l)return;const a=N(l,f,u);h.updateMatrixWorld(!0);const e=new _,t=new _,i=new _,n=new _,r=new _,o=new _,d=new _,v=new _;let b=0;for(const S of l.faces){e.set(a[S[0]][0],a[S[0]][1],a[S[0]][2]),t.set(a[S[1]][0],a[S[1]][1],a[S[1]][2]),i.set(a[S[2]][0],a[S[2]][1],a[S[2]][2]),n.subVectors(t,e),r.subVectors(i,e),d.crossVectors(n,r);const E=d.length()/2;E>1e-12&&(o.set(0,0,0).add(e).add(t).add(i).multiplyScalar(1/3),v.addScaledVector(o,E),b+=E)}I=b>1e-12?v.multiplyScalar(1/b).applyMatrix4(h.matrixWorld):I,h.update(a,At(),u<1?l.activeEdges[f]:[],kt(a)),Lt(),Rt(),y.shadowMap.needsUpdate=!0,C=!0}function zt(){const a=l.titles||Ct;s("steps").replaceChildren(...a.map((e,t)=>{const i=document.createElement("button");i.className="step",i.dataset.step=t,i.setAttribute("role","option");const n=document.createElement("span");n.className="number",n.textContent=t+1;const r=document.createElement("span");return r.textContent=e,i.append(n,r),i.onclick=()=>{f=t,u=0,p=!1,m=!1,x=!1,P(),w(),we(!1)},i}))}function we(a){const e=s("stepDropdown"),t=s("stepCounter"),i=s("stepPillArrow");if(!e)return;const n=a??e.hidden;e.hidden=!n,t.setAttribute("aria-expanded",String(n)),i.textContent=n?"✕":"▾",n&&e.querySelector("[aria-current]")?.scrollIntoView({block:"nearest"})}let Re=0,ke="",ze=null,Fe=null,Ne="",Oe=null;function w(){M!==Re&&(Re=M,s("speed").textContent=`${M}×`,s("speed").setAttribute("aria-label",`Playback speed ${M} times. Change to ${M%3+1} times`));const a=l?.frames.length||0,e=l?`Step ${f+1}`:`${K||"Origami"}`;e!==ke&&(ke=e,s("stepPillText").textContent=e);const t=p&&!m?Z.pause:Z.play;t!==ze&&(ze=t,s("play").innerHTML=t),s("play").setAttribute("aria-label",p&&!m?"Pause step":u===1?"Replay step":"Play step"),s("play").title=s("play").getAttribute?.("aria-label")||"Play step",s("play").setAttribute("aria-pressed",String(p&&!m));const i=p&&m?Z.pause:ne('<path d="M5 12h14m-6-6 6 6-6 6"/>');i!==Fe&&(Fe=i,s("playAll").innerHTML=i),s("playAll").setAttribute("aria-label",p&&m?"Pause continuous playback":"Play all remaining steps"),s("playAll").title=p&&m?"Pause all":"Play all",s("playAll").setAttribute("aria-pressed",String(p&&m)),s("progress").value=Math.round(u*1e3),s("progress").style.setProperty("--fold-progress",`${u*100}%`);const n=!l||f===0;n!==Oe&&(Oe=n,s("prev").disabled=n);const r=f===a-1?"Finish":"Next Step";r!==Ne&&(Ne=r,s("next").textContent=r),s("next").disabled=!l||f===a-1&&u===1,document.querySelectorAll("#steps .step").forEach((o,d)=>{d===f?o.setAttribute("aria-current","step"):o.removeAttribute("aria-current")})}function be(){x=!1,f<l.frames.length-1?(f++,u=0,p=!0):(p=!1,m=!1),P(),w()}s("play").onclick=()=>{if(!l)return;const a=m;m=!1,u===1&&(u=0),p=a||!p,p||(x=!1),P(),w()};s("stepCounter").onclick=()=>{l&&we()};const X=matchMedia("(max-width:600px)");function je(a){document.body.classList.toggle("mobile-layout",a),document.body.classList.toggle("force-desktop",!a&&X.matches),s("mobileToggle").setAttribute("aria-pressed",String(a))}let U=null;s("mobileToggle").onclick=()=>{U=!document.body.classList.contains("mobile-layout"),je(U)};function Qe(){U===null&&je(X.matches)}X.addEventListener("change",()=>{Qe(),U!==null&&document.body.classList.toggle("force-desktop",!U&&X.matches)});Qe();s("speed").onclick=()=>{M=M%3+1,w()};s("playAll").onclick=()=>{if(l){if(p&&m){p=!1,m=!1,x=!1,w();return}if(m=!0,x=!1,u>=1){if(f<l.frames.length-1){be();return}f=0,u=0}p=!0,P(),w()}};s("prev").onclick=()=>{!l||f===0||(D=null,f--,u=1,p=!1,m=!1,x=!1,P(),w())};s("next").onclick=()=>{if(l){if(u>=1){be();return}x=!0,p=!0,w()}};s("progress").oninput=a=>{l&&(D=null,p=!1,m=!1,x=!1,u=Number(a.target.value)/1e3,P(),w())};const Ft=["front","back","spatial"];function Y(a,e){if(!c)return;D=null;const t=c.target,i=e??g.position.distanceTo(t);g.up.set(0,1,0),a==="front"?g.position.set(t.x,t.y,t.z+i):a==="back"&&g.position.set(t.x,t.y,t.z-i),c.minPolarAngle=Math.PI*.15,c.maxPolarAngle=Math.PI*.55,c.enableRotate=a==="spatial",c.update();for(const n of Ft)s(n).setAttribute("aria-pressed",String(n===a));s("paper").setAttribute("aria-label",`${K||"Origami"} origami model, ${a} view. `+(a==="spatial"?"Drag to rotate; pinch or scroll to zoom.":"Pinch or scroll to zoom.")),C=!0}s("front").onclick=()=>Y("front");s("back").onclick=()=>Y("back");s("spatial").onclick=()=>Y("spatial");for(const[a,e]of[["zoomIn",1/1.2],["zoomOut",1.2]])s(a).onclick=()=>{if(!c||!l)return;D=null;const t=g.position.clone().sub(c.target),i=B.clamp(t.length()*e,c.minDistance,c.maxDistance);g.position.copy(c.target).add(t.setLength(i)),c.update(),C=!0};function Nt(a){const e=new de(a);return .2126*e.r+.7152*e.g+.0722*e.b>.72&&e.multiplyScalar(.42),"#"+e.getHexString()}function ye(a=!1){const e=L;L=ie(W,z),h&&h.setTexture(L);for(const i of G.values())i.paper.setTexture(L),i.dirty=!0;e.dispose();const t=Nt(z);document.documentElement.style.setProperty("--control-accent",t),a&&document.documentElement.style.setProperty("--accent",t),document.querySelectorAll("[data-color]").forEach(i=>i.setAttribute("aria-pressed",String(i.dataset.color===z))),document.querySelectorAll("[data-pattern]").forEach(i=>{i.setAttribute("aria-pressed",String(i.dataset.pattern===W));const n=ie(i.dataset.pattern,z);i.querySelector(".pattern-preview").style.backgroundImage=`url(${n.image.toDataURL()})`,n.dispose()}),C=!0}document.querySelectorAll("[data-color]").forEach(a=>a.onclick=()=>{z=a.dataset.color,ye(!0)});document.querySelectorAll("[data-pattern]").forEach(a=>a.onclick=()=>{W=a.dataset.pattern,ye()});function Ot(){const a=s("modelGrid");a.innerHTML="";for(const e of ge){const t=document.createElement("button");t.className="model-item",t.dataset.animal=e,t.setAttribute("aria-label",`${e} — preview finished model`);const i=document.createElement("canvas");i.className="model-preview",i.setAttribute("aria-hidden","true");const n=document.createElement("span");n.className="model-name",n.textContent=e,t.append(i,n),t.onclick=()=>Bt(e,t),a.append(t)}We()}function We(){document.querySelectorAll(".model-item").forEach(a=>{a.classList.toggle("selected",a.dataset.animal===K)})}let Q=null;function Bt(a,e){e.classList.add("pumping"),document.querySelectorAll(".model-item").forEach(t=>{t!==e&&t.classList.add("faded")}),setTimeout(()=>Gt(a),380)}async function Gt(a){const e=s("appDialog");document.querySelectorAll(".panel-content>section").forEach(i=>i.hidden=i.id!=="panel-preview"),s("panelTitle").textContent=a,e.classList.add("preview-open"),document.body.classList.add("modal-open"),s("modalScrim").hidden=!1,e.open||e.showModal(),s("previewStart").onclick=()=>{ce(),j(),xe(a)},s("previewClose").onclick=()=>{ce(),$e("models")};const t=s("previewBig");try{const i=await Se(a),n=new ue({canvas:t,alpha:!0,antialias:!0});n.setPixelRatio(Math.min(devicePixelRatio||1,2));const r=new pe,o=new fe(36,1,.1,30),d=new he(i,L),v=d.update(N(i,i.frames.length-1,1));r.add(d),ve(r);const b=new Ie().setFromObject(d),S=b.getSize(new _).length();o.position.copy(v).add(new _(.5,.35,1).normalize().multiplyScalar(Math.max(1,S*1.6)));const E=new me(o,t);E.target.copy(v),E.enablePan=!1,E.update();const _e=()=>{const R=t.getBoundingClientRect();R.width&&R.height&&(n.setSize(R.width,R.height,!1),o.aspect=R.width/R.height,o.updateProjectionMatrix())};_e(),new ResizeObserver(_e).observe(t);const Ee=()=>{!e.open||s("panel-preview").hidden||(n.render(r,o),requestAnimationFrame(Ee))};Ee(),Q={renderer:n,scene:r,camera:o,paper:d,controls:E}}catch(i){console.warn("Big preview unavailable:",a,i)}}function ce(){Q&&(Q.renderer.dispose(),Q=null),s("appDialog").classList.remove("preview-open"),document.querySelectorAll(".model-item").forEach(a=>a.classList.remove("pumping","faded"))}s("appDialog").addEventListener("close",()=>{ce()});let te=!1,Be;async function It(){if(!te){te=!0;for(const a of ge.filter(e=>!He[e]))if(!G.has(a))try{const e=await Se(a),t=document.querySelector(`[data-animal="${a}"] .model-preview`),i=Be||(Be=new ue({canvas:document.createElement("canvas"),alpha:!0,antialias:!0,preserveDrawingBuffer:!0}));i.setPixelRatio(Math.min(devicePixelRatio||1,1.5));const n=new pe,r=new fe(36,1,.1,30),o=new he(e,L),d=o.update(N(e,e.frames.length-1,1));n.add(o),ve(n);const v=new Ie().setFromObject(o),b=v.getSize(new _).length();r.position.copy(d).add(new _(e.cuts?.6:a.startsWith("Dinosaur")?.55:.48,e.cuts?-.6:a.startsWith("Dinosaur")?.25:.3,1).normalize().multiplyScalar(Math.max(1,b*1.55)));const S=new me(r,t);S.target.copy(d),S.enablePan=!1,S.enableZoom=!1,S.update();const E={renderer:i,scene:n,camera:r,paper:o,controls:S,canvas:t,context:t.getContext("2d"),dirty:!0};S.addEventListener("change",()=>E.dirty=!0),G.set(a,E),new ResizeObserver(()=>E.dirty=!0).observe(t)}catch(e){console.warn(`Preview unavailable: ${a}`,e),document.querySelector(`[data-animal="${a}"] canvas`).setAttribute("aria-label",`${a} preview unavailable. Click to select.`)}te=!1}}document.addEventListener("panel-open",a=>{if(D=null,p=!1,m=!1,x=!1,w(),a.detail==="models"){It();for(const e of G.values())e.dirty=!0}});function Xe(a){const e=ee?Math.min((a-ee)/1e3,.05):0;if(ee=a,l&&!document.hidden){if(p&&!(D?.prepare&&u===0)){const t=l.motions?.[f],i=t?.type==="foundation"?l.foundation.motions[t.step]:t,n=i?.type==="cut"?12:i?.type==="panel-tree"||(i?.curve?.length||0)>1?7.2:5.6;u=Math.min(1,u+e*M/n),u===1&&(p=!1),P(),u===1&&(x||m)?be():w()}if(Tt(e),D){const t=D;t.elapsed=Math.min(1,t.elapsed+e/t.duration);const i=t.elapsed,n=i*i*i*(i*(i*6-15)+10),r=B.lerp(t.from.length(),t.to.length(),n),o=t.from.clone().normalize(),d=t.to.clone().normalize(),v=new Pe().setFromUnitVectors(o,d),b=o.applyQuaternion(new Pe().slerp(v,n)).multiplyScalar(r);g.position.copy(c.target).add(b),c.update(),C=!0,t.elapsed===1&&(D=null)}}if(y&&C&&(k.render(),C=!1),s("appDialog").open&&!s("panel-models").hidden){for(const t of G.values())if(t.dirty){const i=t.canvas.getBoundingClientRect();if(i.width&&i.height){t.renderer.setSize(i.width,i.height,!1),t.camera.aspect=i.width/i.height,t.camera.updateProjectionMatrix(),t.renderer.render(t.scene,t.camera);const n=t.renderer.domElement;(t.canvas.width!==n.width||t.canvas.height!==n.height)&&(t.canvas.width=n.width,t.canvas.height=n.height),t.context.clearRect(0,0,t.canvas.width,t.canvas.height),t.context.drawImage(n,0,0),t.dirty=!1}}}requestAnimationFrame(Xe)}Ot();ye();w();xe(Ve);requestAnimationFrame(Xe);if(document.modelContext?.registerTool)try{Promise.resolve(document.modelContext.registerTool({name:"show_origami_step",description:"Show a paused folding step for the currently selected animal.",inputSchema:{type:"object",properties:{step:{type:"integer",minimum:1},progress:{type:"number",minimum:0,maximum:1}},required:["step","progress"],additionalProperties:!1},annotations:{readOnlyHint:!1},execute(a){if(!l||!a||!Number.isInteger(a.step)||a.step<1||a.step>l.frames.length||!Number.isFinite(a.progress)||a.progress<0||a.progress>1)throw Error("Invalid step or progress");return f=a.step-1,u=a.progress,p=!1,m=!1,x=!1,P(),w(),{step:f+1,progress:u,playing:p}}})).catch(console.error)}catch(a){console.error(a)}
