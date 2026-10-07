import{M as Qe,O as We,B as Xe,F as ye,S as _e,U as Fe,V as te,W as Ke,H as Ye,N as Ze,C as Je,a as re,R as et,b as tt,c as at,L as it,d as st,e as nt,A as rt,f as ot,g as lt,h as ct,m as ae,i as oe,j as le,P as ce,k as de,s as ue,l as Oe,n as b,o as pe,p as O,Q as Ee,v as dt,q as ut,D as Ce,r as pt}from"./patterns-CgFWMmPm.js";const ft={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class U{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const ht=new We(-1,1,1,-1,0,1);class mt extends Xe{constructor(){super(),this.setAttribute("position",new ye([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ye([0,2,0,0,2,0],2))}}const gt=new mt;class Be{constructor(e){this._mesh=new Qe(gt,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,ht)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Ge extends U{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof _e?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Fe.clone(e.uniforms),this.material=new _e({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Be(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class De extends U{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const n=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,p;this.inverse?(o=0,p=1):(o=1,p=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(n.REPLACE,n.REPLACE,n.REPLACE),r.buffers.stencil.setFunc(n.ALWAYS,o,4294967295),r.buffers.stencil.setClear(p),r.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(n.EQUAL,1,4294967295),r.buffers.stencil.setOp(n.KEEP,n.KEEP,n.KEEP),r.buffers.stencil.setLocked(!0)}}class vt extends U{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class St{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new te);this._width=i.width,this._height=i.height,t=new Ke(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Ye}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Ge(ft),this.copyPass.material.blending=Ze,this.clock=new Je}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let n=0,r=this.passes.length;n<r;n++){const o=this.passes[n];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(n),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),o.needsSwap){if(i){const p=this.renderer.getContext(),y=this.renderer.state.buffers.stencil;y.setFunc(p.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),y.setFunc(p.EQUAL,1,4294967295)}this.swapBuffers()}De!==void 0&&(o instanceof De?i=!0:o instanceof vt&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new te);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,n=this._height*this._pixelRatio;this.renderTarget1.setSize(i,n),this.renderTarget2.setSize(i,n);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,n)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class xt extends U{constructor(e,t,i=null,n=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=n,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new re}render(e,t,i){const n=e.autoClear;e.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=n}}const wt={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new te(1/1024,1/512)}},vertexShader:`

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

		}`},q={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class bt extends U{constructor(){super(),this.uniforms=Fe.clone(q.uniforms),this.material=new et({name:q.name,uniforms:this.uniforms,vertexShader:q.vertexShader,fragmentShader:q.fragmentShader}),this._fsQuad=new Be(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},tt.getTransfer(this._outputColorSpace)===at&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===it?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===st?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===nt?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===rt?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===ot?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===lt?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===ct&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const fe=["Frog","Crane","Whale","Butterfly"],Ie={},yt=[],T=a=>document.getElementById(a),A=T("appDialog");let ie;function V(){A.open&&A.close(),document.body.classList.remove("modal-open"),T("modalScrim").hidden=!0,document.querySelectorAll("#menu button").forEach(a=>{a.removeAttribute("aria-current")}),T("menu").style.setProperty("--active-tab",-1)}function Ue(a){ie=document.activeElement,document.querySelectorAll(".panel-content>section").forEach(t=>t.hidden=t.id!==`panel-${a}`),T("panelTitle").textContent={color:"Paper color",paper:"Paper texture",models:"Origami library",thanks:"Thanks"}[a],document.body.classList.add("modal-open"),T("modalScrim").hidden=!1,A.open||A.showModal();const e={color:0,paper:1,models:2,thanks:3}[a];e!==void 0&&(T("menu").style.setProperty("--active-tab",e),document.querySelectorAll("#menu button").forEach((t,i)=>{t.toggleAttribute("aria-current",i===e)})),document.dispatchEvent(new CustomEvent("panel-open",{detail:a}))}function _t(){document.querySelectorAll("[data-panel]").forEach(a=>a.addEventListener("click",()=>Ue(a.dataset.panel))),T("closePanel").onclick=V,A.addEventListener("close",()=>{V(),ie?.isConnected&&ie.focus()}),A.addEventListener("click",a=>{if(a.target!==A)return;const e=A.getBoundingClientRect();(a.clientX<e.left||a.clientX>e.right||a.clientY<e.top||a.clientY>e.bottom)&&V()})}const s=a=>document.getElementById(a),se=a=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${a}</svg>`,Y={play:se('<path d="m8 5 11 7-11 7z"/>'),pause:se('<path d="M8 5v14M16 5v14"/>')},Pe=new URLSearchParams(document.location?.search||"").get("animal"),qe=fe.includes(Pe)?Pe:"Crane";let X=qe,c,m=0,u=0,d=!1,f=!1,S=!1,M=1,Z=0,z="#087b96",Q="solid",L=ae(Q,z),Me=null,C=null,w,N,h,l,v,k,E=!0,J=0;const H=new Map,B=new Map;_t();function he(a,e=!1){a.add(new ut(16777215,7899549,1.5));const t=new Ce(16774887,2.5);t.position.set(-3.5,4,5),t.castShadow=e,e&&(t.shadow.mapSize.set(2048,2048),Object.assign(t.shadow.camera,{left:-3,right:3,top:3,bottom:-3,near:.1,far:20}),t.shadow.intensity=.12,t.shadow.bias=-3e-4,t.shadow.normalBias=.008),a.add(t);const i=new Ce(13031926,.95);i.position.set(3,-1,-5),a.add(i)}function Et(){w=new oe({canvas:s("paper"),antialias:!0}),w.setPixelRatio(Math.min(devicePixelRatio||1,2)),w.shadowMap.enabled=!0,w.shadowMap.autoUpdate=!1,w.shadowMap.needsUpdate=!0,w.shadowMap.type=pt,N=new le,N.background=new re("#ffffff"),h=new ce(36,1,.1,30),h.position.set(.5,3.2,4.2),l=new pe(h,s("paper")),l.enablePan=!1,l.zoomToCursor=!1,l.minDistance=1.5,l.maxDistance=12,l.maxPolarAngle=Math.PI*.55,l.minPolarAngle=Math.PI*.15,l.addEventListener("change",()=>E=!0),l.addEventListener("start",()=>{C=null}),he(N,!1),k=new St(w),k.addPass(new xt(N,h)),k.addPass(new bt);const a=new Ge(wt);k.addPass(a);const e=()=>{const t=s("paper").getBoundingClientRect();if(!t.width||!t.height)return;w.setSize(t.width,t.height,!1),h.aspect=t.width/t.height,h.updateProjectionMatrix(),k.setSize(t.width,t.height);const i=w.getPixelRatio();a.uniforms.resolution.value.set(1/(t.width*i),1/(t.height*i)),E=!0};new ResizeObserver(e).observe(s("paper")),e(),s("paper").addEventListener("webglcontextlost",t=>{t.preventDefault(),d=!1,f=!1,S=!1,F("3D view interrupted","Reload this page to restore the graphics view.")})}async function me(a){if(H.has(a))return H.get(a);const e=(async()=>{const t=await fetch(a==="Crane"?"./crane-motion.json":`./models/${a.toLowerCase()}.json`);if(!t.ok)throw Error("Model unavailable");const i=await t.json();if(dt(i,a),i.complete!==!0)throw Error("Folding lesson is incomplete");return i})();H.set(a,e);try{return await e}catch(t){throw H.delete(a),t}}function F(a,e,t){s("modelMessage").hidden=!1,s("messageTitle").textContent=a,s("messageText").textContent=e,s("referenceLink").hidden=!0,s("playback").hidden=!0,s("stepPillWrap").hidden=!0,ve(!1)}function Ct(){C=null,G=null,v&&(N.remove(v),v.dispose(),v=null),c=null,d=!1,f=!1,S=!1,s("steps").replaceChildren(),E=!0}async function ge(a,e="default"){const t=++Z;if(Me?.(),Me=null,s("appSurface").style.minHeight="",s("videoLesson").hidden=!0,s("paper").hidden=!1,s("viewControls").hidden=!1,s("front").hidden=!1,s("back").hidden=!1,s("spatial").hidden=!1,s("menuColor").disabled=!1,s("menuPaper").disabled=!1,s("retry").hidden=!0,X=a,document.title=a?`${a} — Origami`:"Origami",Ve(),w&&Ct(),!a){s("paper").setAttribute("aria-label","Origami workspace"),F("Choose a model","Select a tutorial from Models to begin.");return}if(Ie[a]){s("viewControls").hidden=!0,F(a,"The native 3D folding sequence is not ready yet. This animal cannot currently be folded in the app.");return}F("Loading…","");try{const i=await me(a);if(t!==Z)return;w||Et(),c=i,m=0,u=0,d=!1,f=!1,S=!1,v=new de(c,L),v.rotation.set(Math.PI,Math.PI,0),N.add(v),l.target.set(0,0,0),K("front",2),s("modelMessage").hidden=!0,s("playback").hidden=!1,s("stepPillWrap").hidden=!1,At(),P(),x()}catch(i){if(t!==Z)return;console.error(i),F("Unable to show the 3D model",/WebGL|context/i.test(i.message)?"3D graphics are unavailable in this browser. Try a browser with graphics acceleration enabled.":"The model could not load. Please try again."),s("retry").hidden=!1,s("retry").onclick=()=>{s("retry").hidden=!0,ge(a)}}}function Dt(){return c.surfaceMarks&&m===c.frames.length-1&&u===1?[]:[...new Set(c.activeEdges.slice(0,m+(u>=1?1:0)).flat())]}let G=null;const $=new b;function Pt(a){if(!G||!h||!l||!c)return;const e=1-Math.exp(-a*5);$.copy(G).sub(l.target).multiplyScalar(e),!($.lengthSq()<1e-12)&&(l.target.add($),h.position.add($),l.update(),E=!0)}function Mt(){if(!v||!h||!l||!c||!v.geometry.boundingSphere)return;const a=v.geometry.boundingSphere,e=l.target,t=a.radius,i=Math.tan(O.degToRad(h.fov/2)),n=Math.min(i,i*h.aspect);if(!(n>0))return;const r=O.clamp(t/n*1.03,l.minDistance,l.maxDistance),o=h.position.distanceTo(e);if(o<r-1e-6){const p=h.position.clone().sub(e).normalize();h.position.copy(e).addScaledVector(p,O.lerp(o,r,.25)),l.update(),E=!0}}function P(){if(!v||!c)return;const a=ue(c,m,u);v.updateMatrixWorld(!0);const e=new b,t=new b,i=new b,n=new b,r=new b,o=new b,p=new b,y=new b;let D=0;for(const g of c.faces){e.set(a[g[0]][0],a[g[0]][1],a[g[0]][2]),t.set(a[g[1]][0],a[g[1]][1],a[g[1]][2]),i.set(a[g[2]][0],a[g[2]][1],a[g[2]][2]),n.subVectors(t,e),r.subVectors(i,e),p.crossVectors(n,r);const _=p.length()/2;_>1e-12&&(o.set(0,0,0).add(e).add(t).add(i).multiplyScalar(1/3),y.addScaledVector(o,_),D+=_)}G=D>1e-12?y.multiplyScalar(1/D).applyMatrix4(v.matrixWorld):G,v.update(a,Dt(),u<1?c.activeEdges[m]:[]),Mt(),w.shadowMap.needsUpdate=!0,E=!0}function At(){const a=c.titles||yt;s("steps").replaceChildren(...a.map((e,t)=>{const i=document.createElement("button");i.className="step",i.dataset.step=t,i.setAttribute("role","option");const n=document.createElement("span");n.className="number",n.textContent=t+1;const r=document.createElement("span");return r.textContent=e,i.append(n,r),i.onclick=()=>{m=t,u=0,d=!1,f=!1,S=!1,P(),x(),ve(!1)},i}))}function ve(a){const e=s("stepDropdown"),t=s("stepCounter"),i=s("stepPillArrow");if(!e)return;const n=a??e.hidden;e.hidden=!n,t.setAttribute("aria-expanded",String(n)),i.textContent=n?"✕":"▾",n&&e.querySelector("[aria-current]")?.scrollIntoView({block:"nearest"})}let Ae=0,Le="",Te=null,Re=null,ke="",ze=null;function x(){M!==Ae&&(Ae=M,s("speed").textContent=`${M}×`,s("speed").setAttribute("aria-label",`Playback speed ${M} times. Change to ${M%3+1} times`));const a=c?.frames.length||0,e=c?`Step ${m+1}`:`${X||"Origami"}`;e!==Le&&(Le=e,s("stepPillText").textContent=e);const t=d&&!f?Y.pause:Y.play;t!==Te&&(Te=t,s("play").innerHTML=t),s("play").setAttribute("aria-label",d&&!f?"Pause step":u===1?"Replay step":"Play step"),s("play").title=s("play").getAttribute?.("aria-label")||"Play step",s("play").setAttribute("aria-pressed",String(d&&!f));const i=d&&f?Y.pause:se('<path d="M5 12h14m-6-6 6 6-6 6"/>');i!==Re&&(Re=i,s("playAll").innerHTML=i),s("playAll").setAttribute("aria-label",d&&f?"Pause continuous playback":"Play all remaining steps"),s("playAll").title=d&&f?"Pause all":"Play all",s("playAll").setAttribute("aria-pressed",String(d&&f)),s("progress").value=Math.round(u*1e3),s("progress").style.setProperty("--fold-progress",`${u*100}%`);const n=!c||m===0;n!==ze&&(ze=n,s("prev").disabled=n);const r=m===a-1?"Finish":"Next Step";r!==ke&&(ke=r,s("next").textContent=r),s("next").disabled=!c||m===a-1&&u===1,document.querySelectorAll("#steps .step").forEach((o,p)=>{p===m?o.setAttribute("aria-current","step"):o.removeAttribute("aria-current")})}function Se(){S=!1,m<c.frames.length-1?(m++,u=0,d=!0):(d=!1,f=!1),P(),x()}s("play").onclick=()=>{if(!c)return;const a=f;f=!1,u===1&&(u=0),d=a||!d,d||(S=!1),P(),x()};s("stepCounter").onclick=()=>{c&&ve()};const W=matchMedia("(max-width:600px)");function He(a){document.body.classList.toggle("mobile-layout",a),document.body.classList.toggle("force-desktop",!a&&W.matches),s("mobileToggle").setAttribute("aria-pressed",String(a))}let I=null;s("mobileToggle").onclick=()=>{I=!document.body.classList.contains("mobile-layout"),He(I)};function $e(){I===null&&He(W.matches)}W.addEventListener("change",()=>{$e(),I!==null&&document.body.classList.toggle("force-desktop",!I&&W.matches)});$e();s("speed").onclick=()=>{M=M%3+1,x()};s("playAll").onclick=()=>{if(c){if(d&&f){d=!1,f=!1,S=!1,x();return}if(f=!0,S=!1,u>=1){if(m<c.frames.length-1){Se();return}m=0,u=0}d=!0,P(),x()}};s("prev").onclick=()=>{!c||m===0||(C=null,m--,u=1,d=!1,f=!1,S=!1,P(),x())};s("next").onclick=()=>{if(c){if(u>=1){Se();return}S=!0,d=!0,x()}};s("progress").oninput=a=>{c&&(C=null,d=!1,f=!1,S=!1,u=Number(a.target.value)/1e3,P(),x())};const Lt=["front","back","spatial"];function K(a,e){if(!l)return;C=null;const t=l.target,i=e??h.position.distanceTo(t);h.up.set(0,1,0),a==="front"?h.position.set(t.x,t.y,t.z+i):a==="back"&&h.position.set(t.x,t.y,t.z-i),l.minPolarAngle=Math.PI*.15,l.maxPolarAngle=Math.PI*.55,l.enableRotate=a==="spatial",l.update();for(const n of Lt)s(n).setAttribute("aria-pressed",String(n===a));s("paper").setAttribute("aria-label",`${X||"Origami"} origami model, ${a} view. `+(a==="spatial"?"Drag to rotate; pinch or scroll to zoom.":"Pinch or scroll to zoom.")),E=!0}s("front").onclick=()=>K("front");s("back").onclick=()=>K("back");s("spatial").onclick=()=>K("spatial");for(const[a,e]of[["zoomIn",1/1.2],["zoomOut",1.2]])s(a).onclick=()=>{if(!l||!c)return;C=null;const t=h.position.clone().sub(l.target),i=O.clamp(t.length()*e,l.minDistance,l.maxDistance);h.position.copy(l.target).add(t.setLength(i)),l.update(),E=!0};function Tt(a){const e=new re(a);return .2126*e.r+.7152*e.g+.0722*e.b>.72&&e.multiplyScalar(.42),"#"+e.getHexString()}function xe(a=!1){const e=L;L=ae(Q,z),v&&v.setTexture(L);for(const i of B.values())i.paper.setTexture(L),i.dirty=!0;e.dispose();const t=Tt(z);document.documentElement.style.setProperty("--control-accent",t),a&&document.documentElement.style.setProperty("--accent",t),document.querySelectorAll("[data-color]").forEach(i=>i.setAttribute("aria-pressed",String(i.dataset.color===z))),document.querySelectorAll("[data-pattern]").forEach(i=>{i.setAttribute("aria-pressed",String(i.dataset.pattern===Q));const n=ae(i.dataset.pattern,z);i.querySelector(".pattern-preview").style.backgroundImage=`url(${n.image.toDataURL()})`,n.dispose()}),E=!0}document.querySelectorAll("[data-color]").forEach(a=>a.onclick=()=>{z=a.dataset.color,xe(!0)});document.querySelectorAll("[data-pattern]").forEach(a=>a.onclick=()=>{Q=a.dataset.pattern,xe()});function Rt(){const a=s("modelGrid");a.innerHTML="";for(const e of fe){const t=document.createElement("button");t.className="model-item",t.dataset.animal=e,t.setAttribute("aria-label",`${e} — preview finished model`);const i=document.createElement("canvas");i.className="model-preview",i.setAttribute("aria-hidden","true");const n=document.createElement("span");n.className="model-name",n.textContent=e,t.append(i,n),t.onclick=()=>kt(e,t),a.append(t)}Ve()}function Ve(){document.querySelectorAll(".model-item").forEach(a=>{a.classList.toggle("selected",a.dataset.animal===X)})}let j=null;function kt(a,e){e.classList.add("pumping"),document.querySelectorAll(".model-item").forEach(t=>{t!==e&&t.classList.add("faded")}),setTimeout(()=>zt(a),380)}async function zt(a){const e=s("appDialog");document.querySelectorAll(".panel-content>section").forEach(i=>i.hidden=i.id!=="panel-preview"),s("panelTitle").textContent=a,e.classList.add("preview-open"),document.body.classList.add("modal-open"),s("modalScrim").hidden=!1,e.open||e.showModal(),s("previewStart").onclick=()=>{ne(),V(),ge(a)},s("previewClose").onclick=()=>{ne(),Ue("models")};const t=s("previewBig");try{const i=await me(a),n=new oe({canvas:t,alpha:!0,antialias:!0});n.setPixelRatio(Math.min(devicePixelRatio||1,2));const r=new le,o=new ce(36,1,.1,30),p=new de(i,L),y=p.update(ue(i,i.frames.length-1,1));r.add(p),he(r);const D=new Oe().setFromObject(p),g=D.getSize(new b).length();o.position.copy(y).add(new b(.5,.35,1).normalize().multiplyScalar(Math.max(1,g*1.6)));const _=new pe(o,t);_.target.copy(y),_.enablePan=!1,_.update();const we=()=>{const R=t.getBoundingClientRect();R.width&&R.height&&(n.setSize(R.width,R.height,!1),o.aspect=R.width/R.height,o.updateProjectionMatrix())};we(),new ResizeObserver(we).observe(t);const be=()=>{!e.open||s("panel-preview").hidden||(n.render(r,o),requestAnimationFrame(be))};be(),j={renderer:n,scene:r,camera:o,paper:p,controls:_}}catch(i){console.warn("Big preview unavailable:",a,i)}}function ne(){j&&(j.renderer.dispose(),j=null),s("appDialog").classList.remove("preview-open"),document.querySelectorAll(".model-item").forEach(a=>a.classList.remove("pumping","faded"))}s("appDialog").addEventListener("close",()=>{ne()});let ee=!1,Ne;async function Nt(){if(!ee){ee=!0;for(const a of fe.filter(e=>!Ie[e]))if(!B.has(a))try{const e=await me(a),t=document.querySelector(`[data-animal="${a}"] .model-preview`),i=Ne||(Ne=new oe({canvas:document.createElement("canvas"),alpha:!0,antialias:!0,preserveDrawingBuffer:!0}));i.setPixelRatio(Math.min(devicePixelRatio||1,1.5));const n=new le,r=new ce(36,1,.1,30),o=new de(e,L),p=o.update(ue(e,e.frames.length-1,1));n.add(o),he(n);const y=new Oe().setFromObject(o),D=y.getSize(new b).length();r.position.copy(p).add(new b(e.cuts?.6:a.startsWith("Dinosaur")?.55:.48,e.cuts?-.6:a.startsWith("Dinosaur")?.25:.3,1).normalize().multiplyScalar(Math.max(1,D*1.55)));const g=new pe(r,t);g.target.copy(p),g.enablePan=!1,g.enableZoom=!1,g.update();const _={renderer:i,scene:n,camera:r,paper:o,controls:g,canvas:t,context:t.getContext("2d"),dirty:!0};g.addEventListener("change",()=>_.dirty=!0),B.set(a,_),new ResizeObserver(()=>_.dirty=!0).observe(t)}catch(e){console.warn(`Preview unavailable: ${a}`,e),document.querySelector(`[data-animal="${a}"] canvas`).setAttribute("aria-label",`${a} preview unavailable. Click to select.`)}ee=!1}}document.addEventListener("panel-open",a=>{if(C=null,d=!1,f=!1,S=!1,x(),a.detail==="models"){Nt();for(const e of B.values())e.dirty=!0}});function je(a){const e=J?Math.min((a-J)/1e3,.05):0;if(J=a,c&&!document.hidden){if(d&&!(C?.prepare&&u===0)){const t=c.motions?.[m],i=t?.type==="foundation"?c.foundation.motions[t.step]:t,n=i?.type==="cut"?12:i?.type==="panel-tree"||(i?.curve?.length||0)>1?7.2:5.6;u=Math.min(1,u+e*M/n),u===1&&(d=!1),P(),u===1&&(S||f)?Se():x()}if(Pt(e),C){const t=C;t.elapsed=Math.min(1,t.elapsed+e/t.duration);const i=t.elapsed,n=i*i*i*(i*(i*6-15)+10),r=O.lerp(t.from.length(),t.to.length(),n),o=t.from.clone().normalize(),p=t.to.clone().normalize(),y=new Ee().setFromUnitVectors(o,p),D=o.applyQuaternion(new Ee().slerp(y,n)).multiplyScalar(r);h.position.copy(l.target).add(D),l.update(),E=!0,t.elapsed===1&&(C=null)}}if(w&&E&&(k.render(),E=!1),s("appDialog").open&&!s("panel-models").hidden){for(const t of B.values())if(t.dirty){const i=t.canvas.getBoundingClientRect();if(i.width&&i.height){t.renderer.setSize(i.width,i.height,!1),t.camera.aspect=i.width/i.height,t.camera.updateProjectionMatrix(),t.renderer.render(t.scene,t.camera);const n=t.renderer.domElement;(t.canvas.width!==n.width||t.canvas.height!==n.height)&&(t.canvas.width=n.width,t.canvas.height=n.height),t.context.clearRect(0,0,t.canvas.width,t.canvas.height),t.context.drawImage(n,0,0),t.dirty=!1}}}requestAnimationFrame(je)}Rt();xe();x();ge(qe);requestAnimationFrame(je);if(document.modelContext?.registerTool)try{Promise.resolve(document.modelContext.registerTool({name:"show_origami_step",description:"Show a paused folding step for the currently selected animal.",inputSchema:{type:"object",properties:{step:{type:"integer",minimum:1},progress:{type:"number",minimum:0,maximum:1}},required:["step","progress"],additionalProperties:!1},annotations:{readOnlyHint:!1},execute(a){if(!c||!a||!Number.isInteger(a.step)||a.step<1||a.step>c.frames.length||!Number.isFinite(a.progress)||a.progress<0||a.progress>1)throw Error("Invalid step or progress");return m=a.step-1,u=a.progress,d=!1,f=!1,S=!1,P(),x(),{step:m+1,progress:u,playing:d}}})).catch(console.error)}catch(a){console.error(a)}
