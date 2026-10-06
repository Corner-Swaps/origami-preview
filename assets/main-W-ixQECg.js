import{M as Ke,O as Ye,B as Ze,F as Ce,S as De,U as Ge,V as ne,W as Je,H as et,N as tt,C as at,a as pe,R as it,b as st,c as nt,L as rt,d as lt,e as ot,A as ct,f as dt,g as ut,h as pt,m as re,i as fe,j as he,P as me,k as ge,s as Y,l as Ie,n as E,o as ve,p as G,Q as Pe,v as ft,q as ht,D as Me,r as mt}from"./patterns-BShnR4Ym.js";const gt={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class H{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const vt=new Ye(-1,1,1,-1,0,1);class St extends Ze{constructor(){super(),this.setAttribute("position",new Ce([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ce([0,2,0,0,2,0],2))}}const wt=new St;class Ue{constructor(e){this._mesh=new Ke(wt,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,vt)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class qe extends H{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof De?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Ge.clone(e.uniforms),this.material=new De({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Ue(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Ae extends H{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const n=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let l,u;this.inverse?(l=0,u=1):(l=1,u=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(n.REPLACE,n.REPLACE,n.REPLACE),r.buffers.stencil.setFunc(n.ALWAYS,l,4294967295),r.buffers.stencil.setClear(u),r.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(n.EQUAL,1,4294967295),r.buffers.stencil.setOp(n.KEEP,n.KEEP,n.KEEP),r.buffers.stencil.setLocked(!0)}}class xt extends H{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class bt{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new ne);this._width=i.width,this._height=i.height,t=new Je(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:et}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new qe(gt),this.copyPass.material.blending=tt,this.clock=new at}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let n=0,r=this.passes.length;n<r;n++){const l=this.passes[n];if(l.enabled!==!1){if(l.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(n),l.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),l.needsSwap){if(i){const u=this.renderer.getContext(),S=this.renderer.state.buffers.stencil;S.setFunc(u.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),S.setFunc(u.EQUAL,1,4294967295)}this.swapBuffers()}Ae!==void 0&&(l instanceof Ae?i=!0:l instanceof xt&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new ne);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,n=this._height*this._pixelRatio;this.renderTarget1.setSize(i,n),this.renderTarget2.setSize(i,n);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,n)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class yt extends H{constructor(e,t,i=null,n=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=n,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new pe}render(e,t,i){const n=e.autoClear;e.autoClear=!1;let r,l;this.overrideMaterial!==null&&(l=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=l),e.autoClear=n}}const _t={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new ne(1/1024,1/512)}},vertexShader:`

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

		}`},$={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class Et extends H{constructor(){super(),this.uniforms=Ge.clone($.uniforms),this.material=new it({name:$.name,uniforms:this.uniforms,vertexShader:$.vertexShader,fragmentShader:$.fragmentShader}),this._fsQuad=new Ue(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},st.getTransfer(this._outputColorSpace)===nt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===rt?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===lt?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===ot?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===ct?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===dt?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===ut?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===pt&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const Se=["Frog","Crane","Whale","Butterfly"],He={},Ct=[],R=a=>document.getElementById(a),L=R("appDialog");let le;function Q(){L.open&&L.close(),document.body.classList.remove("modal-open"),R("modalScrim").hidden=!0,document.querySelectorAll("#menu button").forEach(a=>{a.removeAttribute("aria-current")}),R("menu").style.setProperty("--active-tab",-1)}function $e(a){le=document.activeElement,document.querySelectorAll(".panel-content>section").forEach(t=>t.hidden=t.id!==`panel-${a}`),R("panelTitle").textContent={color:"Paper color",paper:"Paper texture",models:"Origami library",thanks:"Thanks"}[a],document.body.classList.add("modal-open"),R("modalScrim").hidden=!1,L.open||L.showModal();const e={color:0,paper:1,models:2,thanks:3}[a];e!==void 0&&(R("menu").style.setProperty("--active-tab",e),document.querySelectorAll("#menu button").forEach((t,i)=>{t.toggleAttribute("aria-current",i===e)})),document.dispatchEvent(new CustomEvent("panel-open",{detail:a}))}function Dt(){document.querySelectorAll("[data-panel]").forEach(a=>a.addEventListener("click",()=>$e(a.dataset.panel))),R("closePanel").onclick=Q,L.addEventListener("close",()=>{Q(),le?.isConnected&&le.focus()}),L.addEventListener("click",a=>{if(a.target!==L)return;const e=L.getBoundingClientRect();(a.clientX<e.left||a.clientX>e.right||a.clientY<e.top||a.clientY>e.bottom)&&Q()})}const s=a=>document.getElementById(a),oe=a=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${a}</svg>`,te={play:oe('<path d="m8 5 11 7-11 7z"/>'),pause:oe('<path d="M8 5v14M16 5v14"/>')},Le=new URLSearchParams(document.location?.search||"").get("animal"),Ve=Se.includes(Le)?Le:"Crane";let Z=Ve,d,m=0,f=0,p=!1,g=!1,b=!1,A=1,ae=0,z="#087b96",X="solid",T=re(X,z),Te=null,D=null,_,N,v,c,w,k,C=!0,ie=0;const V=new Map,I=new Map;Dt();function we(a,e=!1){a.add(new ht(16777215,7899549,1.5));const t=new Me(16774887,2.5);t.position.set(-3.5,4,5),t.castShadow=e,e&&(t.shadow.mapSize.set(2048,2048),Object.assign(t.shadow.camera,{left:-3,right:3,top:3,bottom:-3,near:.1,far:20}),t.shadow.intensity=.12,t.shadow.bias=-3e-4,t.shadow.normalBias=.008),a.add(t);const i=new Me(13031926,.95);i.position.set(3,-1,-5),a.add(i)}function Pt(){_=new fe({canvas:s("paper"),antialias:!0}),_.setPixelRatio(Math.min(devicePixelRatio||1,2)),_.shadowMap.enabled=!0,_.shadowMap.autoUpdate=!1,_.shadowMap.needsUpdate=!0,_.shadowMap.type=mt,N=new he,N.background=new pe("#ffffff"),v=new me(36,1,.1,30),v.position.set(.5,3.2,4.2),c=new ve(v,s("paper")),c.enablePan=!1,c.zoomToCursor=!1,c.minDistance=1.5,c.maxDistance=12,c.maxPolarAngle=Math.PI*.55,c.minPolarAngle=Math.PI*.15,c.addEventListener("change",()=>C=!0),c.addEventListener("start",()=>{D=null}),we(N,!1),k=new bt(_),k.addPass(new yt(N,v)),k.addPass(new Et);const a=new qe(_t);k.addPass(a);const e=()=>{const t=s("paper").getBoundingClientRect();if(!t.width||!t.height)return;_.setSize(t.width,t.height,!1),v.aspect=t.width/t.height,v.updateProjectionMatrix(),k.setSize(t.width,t.height);const i=_.getPixelRatio();a.uniforms.resolution.value.set(1/(t.width*i),1/(t.height*i)),C=!0};new ResizeObserver(e).observe(s("paper")),e(),s("paper").addEventListener("webglcontextlost",t=>{t.preventDefault(),p=!1,g=!1,b=!1,B("3D view interrupted","Reload this page to restore the graphics view.")})}async function xe(a){if(V.has(a))return V.get(a);const e=(async()=>{const t=await fetch(a==="Crane"?"./crane-motion.json":`./models/${a.toLowerCase()}.json`);if(!t.ok)throw Error("Model unavailable");const i=await t.json();if(ft(i,a),i.complete!==!0)throw Error("Folding lesson is incomplete");return i})();V.set(a,e);try{return await e}catch(t){throw V.delete(a),t}}function B(a,e,t){s("modelMessage").hidden=!1,s("messageTitle").textContent=a,s("messageText").textContent=e,s("referenceLink").hidden=!0,s("playback").hidden=!0,s("stepPillWrap").hidden=!0,ye(!1)}function Mt(){D=null,ce=-1,de=null,U=null,w&&(N.remove(w),w.dispose(),w=null),d=null,p=!1,g=!1,b=!1,s("steps").replaceChildren(),C=!0}async function be(a,e="default"){const t=++ae;if(Te?.(),Te=null,s("appSurface").style.minHeight="",s("videoLesson").hidden=!0,s("paper").hidden=!1,s("viewControls").hidden=!1,s("front").hidden=!1,s("back").hidden=!1,s("spatial").hidden=!1,s("menuColor").disabled=!1,s("menuPaper").disabled=!1,s("retry").hidden=!0,Z=a,document.title=a?`${a} — Origami`:"Origami",We(),_&&Mt(),!a){s("paper").setAttribute("aria-label","Origami workspace"),B("Choose a model","Select a tutorial from Models to begin.");return}if(He[a]){s("viewControls").hidden=!0,B(a,"The native 3D folding sequence is not ready yet. This animal cannot currently be folded in the app.");return}B("Loading…","");try{const i=await xe(a);if(t!==ae)return;_||Pt(),d=i,m=0,f=0,p=!1,g=!1,b=!1,w=new ge(d,T),w.rotation.set(Math.PI,Math.PI,0),N.add(w),c.target.set(0,0,0),J("front",2),s("modelMessage").hidden=!0,s("playback").hidden=!1,s("stepPillWrap").hidden=!1,kt(),M(),y()}catch(i){if(t!==ae)return;console.error(i),B("Unable to show the 3D model",/WebGL|context/i.test(i.message)?"3D graphics are unavailable in this browser. Try a browser with graphics acceleration enabled.":"The model could not load. Please try again."),s("retry").hidden=!1,s("retry").onclick=()=>{s("retry").hidden=!0,be(a)}}}function At(){return d.surfaceMarks&&m===d.frames.length-1&&f===1?[]:[...new Set(d.activeEdges.slice(0,m+(f>=1?1:0)).flat())]}let ce=-1,de=null,U=null;const j=new E;function Lt(a){if(!U||!v||!c||!d)return;const e=1-Math.exp(-a*5);j.copy(U).sub(c.target).multiplyScalar(e),!(j.lengthSq()<1e-12)&&(c.target.add(j),v.position.add(j),c.update(),C=!0)}function Tt(){if(!w||!v||!c||!d||!w.geometry.boundingSphere)return;const a=w.geometry.boundingSphere,e=c.target,t=a.radius,i=Math.tan(G.degToRad(v.fov/2)),n=Math.min(i,i*v.aspect);if(!(n>0))return;const r=G.clamp(t/n*1.03,c.minDistance,c.maxDistance),l=v.position.distanceTo(e);if(l<r-1e-6){const u=v.position.clone().sub(e).normalize();v.position.copy(e).addScaledVector(u,G.lerp(l,r,.25)),c.update(),C=!0}}function Rt(a){ce!==m&&(ce=m,de=Y(d,m,0));const e=de;if(!e||e.length!==a.length||f<=0||f>=1)return null;const t=a.length,i=new Array(t),n=new Array(t),r=new Array(t);let l=0,u=0,S=0;for(let o=0;o<t;o++)i[o]=a[o][0]-e[o][0],n[o]=a[o][1]-e[o][1],r[o]=a[o][2]-e[o][2],l+=i[o],u+=n[o],S+=r[o];l/=t,u/=t,S/=t;const x=new Array(t);let h=0;for(let o=0;o<t;o++){const F=i[o]-l,O=n[o]-u,P=r[o]-S,ee=Math.sqrt(F*F+O*O+P*P);x[o]=ee,ee>h&&(h=ee)}if(h<1e-9)return null;for(let o=0;o<t;o++)x[o]=Math.min(1,x[o]/h);return x}function M(){if(!w||!d)return;const a=Y(d,m,f);w.updateMatrixWorld(!0);const e=new E,t=new E,i=new E,n=new E,r=new E,l=new E,u=new E,S=new E;let x=0;for(const h of d.faces){e.set(a[h[0]][0],a[h[0]][1],a[h[0]][2]),t.set(a[h[1]][0],a[h[1]][1],a[h[1]][2]),i.set(a[h[2]][0],a[h[2]][1],a[h[2]][2]),n.subVectors(t,e),r.subVectors(i,e),u.crossVectors(n,r);const o=u.length()/2;o>1e-12&&(l.set(0,0,0).add(e).add(t).add(i).multiplyScalar(1/3),S.addScaledVector(l,o),x+=o)}U=x>1e-12?S.multiplyScalar(1/x).applyMatrix4(w.matrixWorld):U,w.update(a,At(),f<1?d.activeEdges[m]:[],Rt(a)),Tt(),_.shadowMap.needsUpdate=!0,C=!0}function kt(){const a=d.titles||Ct;s("steps").replaceChildren(...a.map((e,t)=>{const i=document.createElement("button");i.className="step",i.dataset.step=t,i.setAttribute("role","option");const n=document.createElement("span");n.className="number",n.textContent=t+1;const r=document.createElement("span");return r.textContent=e,i.append(n,r),i.onclick=()=>{m=t,f=0,p=!1,g=!1,b=!1,M(),y(),ye(!1)},i}))}function ye(a){const e=s("stepDropdown"),t=s("stepCounter"),i=s("stepPillArrow");if(!e)return;const n=a??e.hidden;e.hidden=!n,t.setAttribute("aria-expanded",String(n)),i.textContent=n?"✕":"▾",n&&e.querySelector("[aria-current]")?.scrollIntoView({block:"nearest"})}let Re=0,ke="",ze=null,Ne=null,Fe="",Oe=null;function y(){A!==Re&&(Re=A,s("speed").textContent=`${A}×`,s("speed").setAttribute("aria-label",`Playback speed ${A} times. Change to ${A%3+1} times`));const a=d?.frames.length||0,e=d?`Step ${m+1}`:`${Z||"Origami"}`;e!==ke&&(ke=e,s("stepPillText").textContent=e);const t=p&&!g?te.pause:te.play;t!==ze&&(ze=t,s("play").innerHTML=t),s("play").setAttribute("aria-label",p&&!g?"Pause step":f===1?"Replay step":"Play step"),s("play").title=s("play").getAttribute?.("aria-label")||"Play step",s("play").setAttribute("aria-pressed",String(p&&!g));const i=p&&g?te.pause:oe('<path d="M5 12h14m-6-6 6 6-6 6"/>');i!==Ne&&(Ne=i,s("playAll").innerHTML=i),s("playAll").setAttribute("aria-label",p&&g?"Pause continuous playback":"Play all remaining steps"),s("playAll").title=p&&g?"Pause all":"Play all",s("playAll").setAttribute("aria-pressed",String(p&&g)),s("progress").value=Math.round(f*1e3),s("progress").style.setProperty("--fold-progress",`${f*100}%`);const n=!d||m===0;n!==Oe&&(Oe=n,s("prev").disabled=n);const r=m===a-1?"Finish":"Next Step";r!==Fe&&(Fe=r,s("next").textContent=r),s("next").disabled=!d||m===a-1&&f===1,document.querySelectorAll("#steps .step").forEach((l,u)=>{u===m?l.setAttribute("aria-current","step"):l.removeAttribute("aria-current")})}function _e(){b=!1,m<d.frames.length-1?(m++,f=0,p=!0):(p=!1,g=!1),M(),y()}s("play").onclick=()=>{if(!d)return;const a=g;g=!1,f===1&&(f=0),p=a||!p,p||(b=!1),M(),y()};s("stepCounter").onclick=()=>{d&&ye()};const K=matchMedia("(max-width:600px)");function je(a){document.body.classList.toggle("mobile-layout",a),document.body.classList.toggle("force-desktop",!a&&K.matches),s("mobileToggle").setAttribute("aria-pressed",String(a))}let q=null;s("mobileToggle").onclick=()=>{q=!document.body.classList.contains("mobile-layout"),je(q)};function Qe(){q===null&&je(K.matches)}K.addEventListener("change",()=>{Qe(),q!==null&&document.body.classList.toggle("force-desktop",!q&&K.matches)});Qe();s("speed").onclick=()=>{A=A%3+1,y()};s("playAll").onclick=()=>{if(d){if(p&&g){p=!1,g=!1,b=!1,y();return}if(g=!0,b=!1,f>=1){if(m<d.frames.length-1){_e();return}m=0,f=0}p=!0,M(),y()}};s("prev").onclick=()=>{!d||m===0||(D=null,m--,f=1,p=!1,g=!1,b=!1,M(),y())};s("next").onclick=()=>{if(d){if(f>=1){_e();return}b=!0,p=!0,y()}};s("progress").oninput=a=>{d&&(D=null,p=!1,g=!1,b=!1,f=Number(a.target.value)/1e3,M(),y())};const zt=["front","back","spatial"];function J(a,e){if(!c)return;D=null;const t=c.target,i=e??v.position.distanceTo(t);v.up.set(0,1,0),a==="front"?v.position.set(t.x,t.y,t.z+i):a==="back"&&v.position.set(t.x,t.y,t.z-i),c.minPolarAngle=Math.PI*.15,c.maxPolarAngle=Math.PI*.55,c.enableRotate=a==="spatial",c.update();for(const n of zt)s(n).setAttribute("aria-pressed",String(n===a));s("paper").setAttribute("aria-label",`${Z||"Origami"} origami model, ${a} view. `+(a==="spatial"?"Drag to rotate; pinch or scroll to zoom.":"Pinch or scroll to zoom.")),C=!0}s("front").onclick=()=>J("front");s("back").onclick=()=>J("back");s("spatial").onclick=()=>J("spatial");for(const[a,e]of[["zoomIn",1/1.2],["zoomOut",1.2]])s(a).onclick=()=>{if(!c||!d)return;D=null;const t=v.position.clone().sub(c.target),i=G.clamp(t.length()*e,c.minDistance,c.maxDistance);v.position.copy(c.target).add(t.setLength(i)),c.update(),C=!0};function Nt(a){const e=new pe(a);return .2126*e.r+.7152*e.g+.0722*e.b>.72&&e.multiplyScalar(.42),"#"+e.getHexString()}function Ee(a=!1){const e=T;T=re(X,z),w&&w.setTexture(T);for(const i of I.values())i.paper.setTexture(T),i.dirty=!0;e.dispose();const t=Nt(z);document.documentElement.style.setProperty("--control-accent",t),a&&document.documentElement.style.setProperty("--accent",t),document.querySelectorAll("[data-color]").forEach(i=>i.setAttribute("aria-pressed",String(i.dataset.color===z))),document.querySelectorAll("[data-pattern]").forEach(i=>{i.setAttribute("aria-pressed",String(i.dataset.pattern===X));const n=re(i.dataset.pattern,z);i.querySelector(".pattern-preview").style.backgroundImage=`url(${n.image.toDataURL()})`,n.dispose()}),C=!0}document.querySelectorAll("[data-color]").forEach(a=>a.onclick=()=>{z=a.dataset.color,Ee(!0)});document.querySelectorAll("[data-pattern]").forEach(a=>a.onclick=()=>{X=a.dataset.pattern,Ee()});function Ft(){const a=s("modelGrid");a.innerHTML="";for(const e of Se){const t=document.createElement("button");t.className="model-item",t.dataset.animal=e,t.setAttribute("aria-label",`${e} — preview finished model`);const i=document.createElement("canvas");i.className="model-preview",i.setAttribute("aria-hidden","true");const n=document.createElement("span");n.className="model-name",n.textContent=e,t.append(i,n),t.onclick=()=>Ot(e,t),a.append(t)}We()}function We(){document.querySelectorAll(".model-item").forEach(a=>{a.classList.toggle("selected",a.dataset.animal===Z)})}let W=null;function Ot(a,e){e.classList.add("pumping"),document.querySelectorAll(".model-item").forEach(t=>{t!==e&&t.classList.add("faded")}),setTimeout(()=>Bt(a),380)}async function Bt(a){const e=s("appDialog");document.querySelectorAll(".panel-content>section").forEach(i=>i.hidden=i.id!=="panel-preview"),s("panelTitle").textContent=a,e.classList.add("preview-open"),document.body.classList.add("modal-open"),s("modalScrim").hidden=!1,e.open||e.showModal(),s("previewStart").onclick=()=>{ue(),Q(),be(a)},s("previewClose").onclick=()=>{ue(),$e("models")};const t=s("previewBig");try{const i=await xe(a),n=new fe({canvas:t,alpha:!0,antialias:!0});n.setPixelRatio(Math.min(devicePixelRatio||1,2));const r=new he,l=new me(36,1,.1,30),u=new ge(i,T),S=u.update(Y(i,i.frames.length-1,1));r.add(u),we(r);const x=new Ie().setFromObject(u),h=x.getSize(new E).length();l.position.copy(S).add(new E(.5,.35,1).normalize().multiplyScalar(Math.max(1,h*1.6)));const o=new ve(l,t);o.target.copy(S),o.enablePan=!1,o.update();const F=()=>{const P=t.getBoundingClientRect();P.width&&P.height&&(n.setSize(P.width,P.height,!1),l.aspect=P.width/P.height,l.updateProjectionMatrix())};F(),new ResizeObserver(F).observe(t);const O=()=>{!e.open||s("panel-preview").hidden||(n.render(r,l),requestAnimationFrame(O))};O(),W={renderer:n,scene:r,camera:l,paper:u,controls:o}}catch(i){console.warn("Big preview unavailable:",a,i)}}function ue(){W&&(W.renderer.dispose(),W=null),s("appDialog").classList.remove("preview-open"),document.querySelectorAll(".model-item").forEach(a=>a.classList.remove("pumping","faded"))}s("appDialog").addEventListener("close",()=>{ue()});let se=!1,Be;async function Gt(){if(!se){se=!0;for(const a of Se.filter(e=>!He[e]))if(!I.has(a))try{const e=await xe(a),t=document.querySelector(`[data-animal="${a}"] .model-preview`),i=Be||(Be=new fe({canvas:document.createElement("canvas"),alpha:!0,antialias:!0,preserveDrawingBuffer:!0}));i.setPixelRatio(Math.min(devicePixelRatio||1,1.5));const n=new he,r=new me(36,1,.1,30),l=new ge(e,T),u=l.update(Y(e,e.frames.length-1,1));n.add(l),we(n);const S=new Ie().setFromObject(l),x=S.getSize(new E).length();r.position.copy(u).add(new E(e.cuts?.6:a.startsWith("Dinosaur")?.55:.48,e.cuts?-.6:a.startsWith("Dinosaur")?.25:.3,1).normalize().multiplyScalar(Math.max(1,x*1.55)));const h=new ve(r,t);h.target.copy(u),h.enablePan=!1,h.enableZoom=!1,h.update();const o={renderer:i,scene:n,camera:r,paper:l,controls:h,canvas:t,context:t.getContext("2d"),dirty:!0};h.addEventListener("change",()=>o.dirty=!0),I.set(a,o),new ResizeObserver(()=>o.dirty=!0).observe(t)}catch(e){console.warn(`Preview unavailable: ${a}`,e),document.querySelector(`[data-animal="${a}"] canvas`).setAttribute("aria-label",`${a} preview unavailable. Click to select.`)}se=!1}}document.addEventListener("panel-open",a=>{if(D=null,p=!1,g=!1,b=!1,y(),a.detail==="models"){Gt();for(const e of I.values())e.dirty=!0}});function Xe(a){const e=ie?Math.min((a-ie)/1e3,.05):0;if(ie=a,d&&!document.hidden){if(p&&!(D?.prepare&&f===0)){const t=d.motions?.[m],i=t?.type==="foundation"?d.foundation.motions[t.step]:t,n=i?.type==="cut"?12:i?.type==="panel-tree"||(i?.curve?.length||0)>1?7.2:5.6;f=Math.min(1,f+e*A/n),f===1&&(p=!1),M(),f===1&&(b||g)?_e():y()}if(Lt(e),D){const t=D;t.elapsed=Math.min(1,t.elapsed+e/t.duration);const i=t.elapsed,n=i*i*i*(i*(i*6-15)+10),r=G.lerp(t.from.length(),t.to.length(),n),l=t.from.clone().normalize(),u=t.to.clone().normalize(),S=new Pe().setFromUnitVectors(l,u),x=l.applyQuaternion(new Pe().slerp(S,n)).multiplyScalar(r);v.position.copy(c.target).add(x),c.update(),C=!0,t.elapsed===1&&(D=null)}}if(_&&C&&(k.render(),C=!1),s("appDialog").open&&!s("panel-models").hidden){for(const t of I.values())if(t.dirty){const i=t.canvas.getBoundingClientRect();if(i.width&&i.height){t.renderer.setSize(i.width,i.height,!1),t.camera.aspect=i.width/i.height,t.camera.updateProjectionMatrix(),t.renderer.render(t.scene,t.camera);const n=t.renderer.domElement;(t.canvas.width!==n.width||t.canvas.height!==n.height)&&(t.canvas.width=n.width,t.canvas.height=n.height),t.context.clearRect(0,0,t.canvas.width,t.canvas.height),t.context.drawImage(n,0,0),t.dirty=!1}}}requestAnimationFrame(Xe)}Ft();Ee();y();be(Ve);requestAnimationFrame(Xe);if(document.modelContext?.registerTool)try{Promise.resolve(document.modelContext.registerTool({name:"show_origami_step",description:"Show a paused folding step for the currently selected animal.",inputSchema:{type:"object",properties:{step:{type:"integer",minimum:1},progress:{type:"number",minimum:0,maximum:1}},required:["step","progress"],additionalProperties:!1},annotations:{readOnlyHint:!1},execute(a){if(!d||!a||!Number.isInteger(a.step)||a.step<1||a.step>d.frames.length||!Number.isFinite(a.progress)||a.progress<0||a.progress>1)throw Error("Invalid step or progress");return m=a.step-1,f=a.progress,p=!1,g=!1,b=!1,M(),y(),{step:m+1,progress:f,playing:p}}})).catch(console.error)}catch(a){console.error(a)}
