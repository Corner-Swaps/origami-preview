import{M as Qe,O as We,B as Ve,F as Ce,S as _e,U as ze,V as ne,W as Xe,H as Ke,N as Ye,C as Ze,a as ue,R as Je,b as et,c as tt,L as at,d as it,e as st,A as nt,f as rt,g as ot,h as lt,m as re,i as pe,j as fe,P as he,k as me,s as ge,l as Ne,n as X,o as ve,p as G,Q as De,v as ct,q as dt,D as Pe,r as ut}from"./patterns-zwrVWLYj.js";const pt={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class U{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const ft=new We(-1,1,1,-1,0,1);class ht extends Ve{constructor(){super(),this.setAttribute("position",new Ce([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ce([0,2,0,0,2,0],2))}}const mt=new ht;class Fe{constructor(e){this._mesh=new Qe(mt,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,ft)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Oe extends U{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof _e?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=ze.clone(e.uniforms),this.material=new _e({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Fe(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Me extends U{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const n=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,f;this.inverse?(o=0,f=1):(o=1,f=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(n.REPLACE,n.REPLACE,n.REPLACE),r.buffers.stencil.setFunc(n.ALWAYS,o,4294967295),r.buffers.stencil.setClear(f),r.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(n.EQUAL,1,4294967295),r.buffers.stencil.setOp(n.KEEP,n.KEEP,n.KEEP),r.buffers.stencil.setLocked(!0)}}class gt extends U{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class vt{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new ne);this._width=i.width,this._height=i.height,t=new Xe(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Ke}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Oe(pt),this.copyPass.material.blending=Ye,this.clock=new Ze}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let n=0,r=this.passes.length;n<r;n++){const o=this.passes[n];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(n),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),o.needsSwap){if(i){const f=this.renderer.getContext(),S=this.renderer.state.buffers.stencil;S.setFunc(f.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),S.setFunc(f.EQUAL,1,4294967295)}this.swapBuffers()}Me!==void 0&&(o instanceof Me?i=!0:o instanceof gt&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new ne);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,n=this._height*this._pixelRatio;this.renderTarget1.setSize(i,n),this.renderTarget2.setSize(i,n);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,n)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class St extends U{constructor(e,t,i=null,n=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=n,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new ue}render(e,t,i){const n=e.autoClear;e.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=n}}const xt={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new ne(1/1024,1/512)}},vertexShader:`

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

		}`},j={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class wt extends U{constructor(){super(),this.uniforms=ze.clone(j.uniforms),this.material=new Je({name:j.name,uniforms:this.uniforms,vertexShader:j.vertexShader,fragmentShader:j.fragmentShader}),this._fsQuad=new Fe(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},et.getTransfer(this._outputColorSpace)===tt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===at?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===it?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===st?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===nt?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===rt?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===ot?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===lt&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const Se=["Frog","Crane","Whale","Butterfly"],Be={},bt=[],L=a=>document.getElementById(a),M=L("appDialog");let oe;function W(){M.open&&M.close(),document.body.classList.remove("modal-open"),L("modalScrim").hidden=!0,document.querySelectorAll("#menu button").forEach(a=>{a.removeAttribute("aria-current")}),L("menu").style.setProperty("--active-tab",-1)}function Ge(a){oe=document.activeElement,document.querySelectorAll(".panel-content>section").forEach(t=>t.hidden=t.id!==`panel-${a}`),L("panelTitle").textContent={color:"Paper color",paper:"Paper texture",models:"Origami library",thanks:"Thanks"}[a],document.body.classList.add("modal-open"),L("modalScrim").hidden=!1,M.open||M.showModal();const e={color:0,paper:1,models:2,thanks:3}[a];e!==void 0&&(L("menu").style.setProperty("--active-tab",e),document.querySelectorAll("#menu button").forEach((t,i)=>{t.toggleAttribute("aria-current",i===e)})),document.dispatchEvent(new CustomEvent("panel-open",{detail:a}))}function yt(){document.querySelectorAll("[data-panel]").forEach(a=>a.addEventListener("click",()=>Ge(a.dataset.panel))),L("closePanel").onclick=W,M.addEventListener("close",()=>{W(),oe?.isConnected&&oe.focus()}),M.addEventListener("click",a=>{if(a.target!==M)return;const e=M.getBoundingClientRect();(a.clientX<e.left||a.clientX>e.right||a.clientY<e.top||a.clientY>e.bottom)&&W()})}const s=a=>document.getElementById(a),le=a=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${a}</svg>`,ee={play:le('<path d="m8 5 11 7-11 7z"/>'),pause:le('<path d="M8 5v14M16 5v14"/>')},Ae=new URLSearchParams(document.location?.search||"").get("animal"),Ie=Se.includes(Ae)?Ae:"Crane";let Y=Ie,l,p=0,u=0,d=!1,h=!1,v=!1,z=1,te=0,k="#087b96",N="#ffffff",K="solid",A=re(K,k),Le=null,C=null,y,R,m,c,g,T,_=!0,ae=0;const Q=new Map,I=new Map;yt();function xe(a,e=!1){a.add(new dt(16777215,7899549,1.5));const t=new Pe(16774887,2.5);t.position.set(-3.5,4,5),t.castShadow=e,e&&(t.shadow.mapSize.set(2048,2048),Object.assign(t.shadow.camera,{left:-3,right:3,top:3,bottom:-3,near:.1,far:20}),t.shadow.intensity=.12,t.shadow.bias=-3e-4,t.shadow.normalBias=.008),a.add(t);const i=new Pe(13031926,.95);i.position.set(3,-1,-5),a.add(i)}function Et(){y=new pe({canvas:s("paper"),antialias:!0}),y.setPixelRatio(Math.min(devicePixelRatio||1,2)),y.shadowMap.enabled=!0,y.shadowMap.autoUpdate=!1,y.shadowMap.needsUpdate=!0,y.shadowMap.type=ut,R=new fe,R.background=new ue("#ffffff"),m=new he(36,1,.1,30),m.position.set(.5,3.2,4.2),c=new ve(m,s("paper")),c.enablePan=!1,c.zoomToCursor=!1,c.minDistance=1.5,c.maxDistance=12,c.maxPolarAngle=Math.PI*.55,c.minPolarAngle=Math.PI*.15,c.addEventListener("change",()=>_=!0),c.addEventListener("start",()=>{C=null}),xe(R,!1),T=new vt(y),T.addPass(new St(R,m)),T.addPass(new wt);const a=new Oe(xt);T.addPass(a);const e=()=>{const t=s("paper").getBoundingClientRect();if(!t.width||!t.height)return;y.setSize(t.width,t.height,!1),m.aspect=t.width/t.height,m.updateProjectionMatrix(),T.setSize(t.width,t.height);const i=y.getPixelRatio();a.uniforms.resolution.value.set(1/(t.width*i),1/(t.height*i)),_=!0};new ResizeObserver(e).observe(s("paper")),e(),s("paper").addEventListener("webglcontextlost",t=>{t.preventDefault(),d=!1,h=!1,v=!1,B("3D view interrupted","Reload this page to restore the graphics view.")})}async function we(a){if(Q.has(a))return Q.get(a);const e=(async()=>{const t=await fetch(a==="Crane"?"./crane-motion.json":`./models/${a.toLowerCase()}.json`);if(!t.ok)throw Error("Model unavailable");const i=await t.json();if(ct(i,a),i.complete!==!0)throw Error("Folding lesson is incomplete");return i})();Q.set(a,e);try{return await e}catch(t){throw Q.delete(a),t}}function B(a,e,t){s("modelMessage").hidden=!1,s("messageTitle").textContent=a,s("messageText").textContent=e,s("referenceLink").hidden=!0,s("playback").hidden=!0,s("stepPillWrap").hidden=!0,ye(!1)}function Ct(){C=null,g&&(R.remove(g),g.dispose(),g=null),l=null,d=!1,h=!1,v=!1,s("steps").replaceChildren(),_=!0}async function be(a,e="default"){const t=++te;if(Le?.(),Le=null,s("appSurface").style.minHeight="",s("videoLesson").hidden=!0,s("paper").hidden=!1,s("viewControls").hidden=!1,s("front").hidden=!1,s("back").hidden=!1,s("spatial").hidden=!1,s("menuColor").disabled=!1,s("menuPaper").disabled=!1,s("retry").hidden=!0,Y=a,document.title=a?`${a} — Origami`:"Origami",He(),y&&Ct(),!a){s("paper").setAttribute("aria-label","Origami workspace"),B("Choose a model","Select a tutorial from Models to begin.");return}if(Be[a]){s("viewControls").hidden=!0,B(a,"The native 3D folding sequence is not ready yet. This animal cannot currently be folded in the app.");return}B("Loading…","");try{const i=await we(a);if(t!==te)return;y||Et(),l=i,p=0,u=0,d=!1,h=!1,v=!1,g=new me(l,A,{backColor:N}),g.rotation.set(Math.PI,Math.PI,0),R.add(g),c.target.set(0,0,0),Z("front",5.2),s("modelMessage").hidden=!0,s("playback").hidden=!1,s("stepPillWrap").hidden=!1,Mt(),D(),w()}catch(i){if(t!==te)return;console.error(i),B("Unable to show the 3D model",/WebGL|context/i.test(i.message)?"3D graphics are unavailable in this browser. Try a browser with graphics acceleration enabled.":"The model could not load. Please try again."),s("retry").hidden=!1,s("retry").onclick=()=>{s("retry").hidden=!0,be(a)}}}function _t(){return l.surfaceMarks&&p===l.frames.length-1&&u===1?[]:[...new Set(l.activeEdges.slice(0,p+(u>=1?1:0)).flat())]}function Dt(){if(!g||!m||!c||!l||!g.geometry.boundingSphere)return;g.updateMatrixWorld();const a=g.geometry.boundingSphere,e=c.target,i=a.center.clone().applyMatrix4(g.matrixWorld).distanceTo(e)+a.radius,n=Math.tan(G.degToRad(m.fov/2)),r=Math.min(n,n*m.aspect);if(!(r>0))return;const o=G.clamp(i/r*1.12,c.minDistance,c.maxDistance),f=m.position.distanceTo(e);if(f<o-1e-6){const S=m.position.clone().sub(e).normalize();m.position.copy(e).addScaledVector(S,G.lerp(f,o,.25)),c.update(),_=!0}}function D(){!g||!l||(g.update(ge(l,p,u),_t(),u<1?l.activeEdges[p]:[]),Dt(),Pt(),y.shadowMap.needsUpdate=!0,_=!0)}let Te=-1,ke=!1,ie=null;function Pt(){const a=s("creaseDiagram");if(!a)return;if(!l||!l.activeEdges){a.innerHTML="",ie=null;return}const e=u>=1;if(ie===l&&Te===p&&ke===e)return;ie=l,Te=p,ke=e;const t=new Set(l.activeEdges[e?p+1:p]||[]);if(!t.size){a.innerHTML="";return}const i=l.flat;let n=1e9,r=-1e9,o=1e9,f=-1e9;for(const x of t){const[q,$]=l.edges[x];for(const H of[q,$])n=Math.min(n,i[H][0]),r=Math.max(r,i[H][0]),o=Math.min(o,i[H][2]),f=Math.max(f,i[H][2])}const S=100,P=100,b=10,E=x=>(b+(x-n)/(r-n||1)*(S-2*b)).toFixed(1),F=x=>(b+(x-o)/(f-o||1)*(P-2*b)).toFixed(1);let O="";for(const x of t){const[q,$]=l.edges[x];O+=`<line x1="${E(i[q][0])}" y1="${F(i[q][2])}" x2="${E(i[$][0])}" y2="${F(i[$][2])}" class="crease next"/>`}a.setAttribute("viewBox",`0 0 ${S} ${P}`),a.innerHTML=O}function Mt(){const a=l.titles||bt;s("steps").replaceChildren(...a.map((e,t)=>{const i=document.createElement("button");i.className="step",i.dataset.step=t,i.setAttribute("role","option");const n=document.createElement("span");n.className="number",n.textContent=t+1;const r=document.createElement("span");return r.textContent=e,i.append(n,r),i.onclick=()=>{p=t,u=0,d=!1,h=!1,v=!1,D(),w(),ye(!1)},i}))}function ye(a){const e=s("stepDropdown"),t=s("stepCounter"),i=s("stepPillArrow");if(!e)return;const n=a??e.hidden;e.hidden=!n,t.setAttribute("aria-expanded",String(n)),i.textContent=n?"✕":"▾",n&&e.querySelector("[aria-current]")?.scrollIntoView({block:"nearest"})}function w(){s("speed").textContent=`${z}×`,s("speed").setAttribute("aria-label",`Playback speed ${z} times. Change to ${z%3+1} times`);const a=l?.frames.length||0,e=(l?.titles||[])[p]||"";s("stepPillText").textContent=l?`Step ${p+1} – ${e}`:`${Y||"Origami"}`,s("play").innerHTML=d&&!h?ee.pause:ee.play,s("play").setAttribute("aria-label",d&&!h?"Pause step":u===1?"Replay step":"Play step"),s("play").title=s("play").getAttribute?.("aria-label")||"Play step",s("play").setAttribute("aria-pressed",String(d&&!h)),s("playAll").innerHTML=d&&h?ee.pause:le('<path d="M5 12h14m-6-6 6 6-6 6"/>'),s("playAll").setAttribute("aria-label",d&&h?"Pause continuous playback":"Play all remaining steps"),s("playAll").title=d&&h?"Pause all":"Play all",s("playAll").setAttribute("aria-pressed",String(d&&h)),s("progress").value=Math.round(u*1e3),s("progress").style.setProperty("--fold-progress",`${u*100}%`),s("prev").disabled=!l||p===0,s("next").disabled=!l||p===a-1&&u===1,s("next").textContent=p===a-1?"Finish":"Next Step",document.querySelectorAll("#steps .step").forEach((t,i)=>{i===p?t.setAttribute("aria-current","step"):t.removeAttribute("aria-current")})}function Ee(){v=!1,p<l.frames.length-1?(p++,u=0,d=!0):(d=!1,h=!1),D(),w()}s("play").onclick=()=>{if(!l)return;const a=h;h=!1,u===1&&(u=0),d=a||!d,d||(v=!1),D(),w()};s("stepCounter").onclick=()=>{l&&ye()};function Ue(a){document.body.classList.toggle("mobile-layout",a),s("mobileToggle").setAttribute("aria-pressed",String(a))}let ce=null;s("mobileToggle").onclick=()=>{ce=!document.body.classList.contains("mobile-layout"),Ue(ce)};const qe=matchMedia("(max-width:600px)");function $e(){ce===null&&Ue(qe.matches)}qe.addEventListener("change",$e);$e();s("speed").onclick=()=>{z=z%3+1,w()};s("playAll").onclick=()=>{if(l){if(d&&h){d=!1,h=!1,v=!1,w();return}if(h=!0,v=!1,u>=1){if(p<l.frames.length-1){Ee();return}p=0,u=0}d=!0,D(),w()}};s("prev").onclick=()=>{!l||p===0||(C=null,p--,u=1,d=!1,h=!1,v=!1,D(),w())};s("next").onclick=()=>{if(l){if(u>=1){Ee();return}v=!0,d=!0,w()}};s("progress").oninput=a=>{l&&(C=null,d=!1,h=!1,v=!1,u=Number(a.target.value)/1e3,D(),w())};const At=["front","back","spatial"];function Z(a,e){if(!c)return;C=null;const t=c.target,i=e??m.position.distanceTo(t);m.up.set(0,1,0),a==="front"?m.position.set(t.x,t.y,t.z+i):a==="back"&&m.position.set(t.x,t.y,t.z-i),c.minPolarAngle=Math.PI*.15,c.maxPolarAngle=Math.PI*.55,c.enableRotate=a==="spatial",c.update();for(const n of At)s(n).setAttribute("aria-pressed",String(n===a));s("paper").setAttribute("aria-label",`${Y||"Origami"} origami model, ${a} view. `+(a==="spatial"?"Drag to rotate; pinch or scroll to zoom.":"Pinch or scroll to zoom.")),_=!0}s("front").onclick=()=>Z("front");s("back").onclick=()=>Z("back");s("spatial").onclick=()=>Z("spatial");for(const[a,e]of[["zoomIn",1/1.2],["zoomOut",1.2]])s(a).onclick=()=>{if(!c||!l)return;C=null;const t=m.position.clone().sub(c.target),i=G.clamp(t.length()*e,c.minDistance,c.maxDistance);m.position.copy(c.target).add(t.setLength(i)),c.update(),_=!0};function Lt(a){const e=new ue(a);return .2126*e.r+.7152*e.g+.0722*e.b>.72&&e.multiplyScalar(.42),"#"+e.getHexString()}function J(a=!1){const e=A;A=re(K,k),g&&(g.setTexture(A),g.setBackColor(N));for(const i of I.values())i.paper.setTexture(A),i.paper.setBackColor(N),i.dirty=!0;e.dispose();const t=Lt(k);document.documentElement.style.setProperty("--control-accent",t),a&&document.documentElement.style.setProperty("--accent",t),document.querySelectorAll("[data-color]").forEach(i=>i.setAttribute("aria-pressed",String(i.dataset.color===k))),document.querySelectorAll("[data-back]").forEach(i=>i.setAttribute("aria-pressed",String(i.dataset.back.toLowerCase()===N.toLowerCase()))),document.querySelectorAll("[data-pattern]").forEach(i=>{i.setAttribute("aria-pressed",String(i.dataset.pattern===K));const n=re(i.dataset.pattern,k);i.querySelector(".pattern-preview").style.backgroundImage=`url(${n.image.toDataURL()})`,n.dispose()}),_=!0}function Tt(){const a=s("backSwatches");if(!a||a.dataset.built)return;a.dataset.built="1";const e=new Set(["#ffffff"]);for(const t of document.querySelectorAll("[data-color]")){const i=t.dataset.color.toLowerCase();if(e.has(i))continue;e.add(i);const n=document.createElement("button");n.className="back-choice",n.dataset.back=t.dataset.color,n.setAttribute("aria-label",t.getAttribute("aria-label")),n.setAttribute("aria-pressed","false");const r=document.createElement("span");r.className="swatch-circle",r.style.background=t.dataset.color;const o=document.createElement("span");o.textContent=t.getAttribute("aria-label"),n.append(r,o),a.appendChild(n)}}document.querySelectorAll("[data-color]").forEach(a=>a.onclick=()=>{k=a.dataset.color,J(!0)});document.querySelectorAll("[data-pattern]").forEach(a=>a.onclick=()=>{K=a.dataset.pattern,J()});Tt();document.querySelectorAll("[data-back]").forEach(a=>a.onclick=()=>{N=a.dataset.back,J()});function kt(){const a=s("modelGrid");a.innerHTML="";for(const e of Se){const t=document.createElement("button");t.className="model-item",t.dataset.animal=e,t.setAttribute("aria-label",`${e} — preview finished model`);const i=document.createElement("canvas");i.className="model-preview",i.setAttribute("aria-hidden","true");const n=document.createElement("span");n.className="model-name",n.textContent=e,t.append(i,n),t.onclick=()=>Rt(e,t),a.append(t)}He()}function He(){document.querySelectorAll(".model-item").forEach(a=>{a.classList.toggle("selected",a.dataset.animal===Y)})}let V=null;function Rt(a,e){e.classList.add("pumping"),document.querySelectorAll(".model-item").forEach(t=>{t!==e&&t.classList.add("faded")}),setTimeout(()=>zt(a),380)}async function zt(a){const e=s("appDialog");document.querySelectorAll(".panel-content>section").forEach(i=>i.hidden=i.id!=="panel-preview"),s("panelTitle").textContent=a,e.classList.add("preview-open"),document.body.classList.add("modal-open"),s("modalScrim").hidden=!1,e.open||e.showModal(),s("previewStart").onclick=()=>{de(),W(),be(a)},s("previewClose").onclick=()=>{de(),Ge("models")};const t=s("previewBig");try{const i=await we(a),n=new pe({canvas:t,alpha:!0,antialias:!0});n.setPixelRatio(Math.min(devicePixelRatio||1,2));const r=new fe,o=new he(36,1,.1,30),f=new me(i,A,{backColor:N}),S=f.update(ge(i,i.frames.length-1,1));r.add(f),xe(r);const P=new Ne().setFromObject(f),b=P.getSize(new X).length();o.position.copy(S).add(new X(.5,.35,1).normalize().multiplyScalar(Math.max(1,b*1.6)));const E=new ve(o,t);E.target.copy(S),E.enablePan=!1,E.update();const F=()=>{const x=t.getBoundingClientRect();x.width&&x.height&&(n.setSize(x.width,x.height,!1),o.aspect=x.width/x.height,o.updateProjectionMatrix())};F(),new ResizeObserver(F).observe(t);const O=()=>{!e.open||s("panel-preview").hidden||(n.render(r,o),requestAnimationFrame(O))};O(),V={renderer:n,scene:r,camera:o,paper:f,controls:E}}catch(i){console.warn("Big preview unavailable:",a,i)}}function de(){V&&(V.renderer.dispose(),V=null),s("appDialog").classList.remove("preview-open"),document.querySelectorAll(".model-item").forEach(a=>a.classList.remove("pumping","faded"))}s("appDialog").addEventListener("close",()=>{de()});let se=!1,Re;async function Nt(){if(!se){se=!0;for(const a of Se.filter(e=>!Be[e]))if(!I.has(a))try{const e=await we(a),t=document.querySelector(`[data-animal="${a}"] .model-preview`),i=Re||(Re=new pe({canvas:document.createElement("canvas"),alpha:!0,antialias:!0,preserveDrawingBuffer:!0}));i.setPixelRatio(Math.min(devicePixelRatio||1,1.5));const n=new fe,r=new he(36,1,.1,30),o=new me(e,A),f=o.update(ge(e,e.frames.length-1,1));n.add(o),xe(n);const S=new Ne().setFromObject(o),P=S.getSize(new X).length();r.position.copy(f).add(new X(e.cuts?.6:a.startsWith("Dinosaur")?.55:.48,e.cuts?-.6:a.startsWith("Dinosaur")?.25:.3,1).normalize().multiplyScalar(Math.max(1,P*1.55)));const b=new ve(r,t);b.target.copy(f),b.enablePan=!1,b.enableZoom=!1,b.update();const E={renderer:i,scene:n,camera:r,paper:o,controls:b,canvas:t,context:t.getContext("2d"),dirty:!0};b.addEventListener("change",()=>E.dirty=!0),I.set(a,E),new ResizeObserver(()=>E.dirty=!0).observe(t)}catch(e){console.warn(`Preview unavailable: ${a}`,e),document.querySelector(`[data-animal="${a}"] canvas`).setAttribute("aria-label",`${a} preview unavailable. Click to select.`)}se=!1}}document.addEventListener("panel-open",a=>{if(C=null,d=!1,h=!1,v=!1,w(),a.detail==="models"){Nt();for(const e of I.values())e.dirty=!0}});function je(a){const e=ae?Math.min((a-ae)/1e3,.05):0;if(ae=a,l&&!document.hidden){if(d&&!(C?.prepare&&u===0)){const t=l.motions?.[p],i=t?.type==="foundation"?l.foundation.motions[t.step]:t,n=i?.type==="cut"?12:i?.type==="panel-tree"||(i?.curve?.length||0)>1?7.2:5.6;u=Math.min(1,u+e*(v?3:z)/n),u===1&&(d=!1),D(),u===1&&(v||h)?Ee():w()}if(C){const t=C;t.elapsed=Math.min(1,t.elapsed+e/t.duration);const i=t.elapsed,n=i*i*i*(i*(i*6-15)+10),r=G.lerp(t.from.length(),t.to.length(),n),o=t.from.clone().normalize(),f=t.to.clone().normalize(),S=new De().setFromUnitVectors(o,f),P=o.applyQuaternion(new De().slerp(S,n)).multiplyScalar(r);m.position.copy(c.target).add(P),c.update(),_=!0,t.elapsed===1&&(C=null)}}if(y&&_&&(T.render(),_=!1),s("appDialog").open&&!s("panel-models").hidden){for(const t of I.values())if(t.dirty){const i=t.canvas.getBoundingClientRect();if(i.width&&i.height){t.renderer.setSize(i.width,i.height,!1),t.camera.aspect=i.width/i.height,t.camera.updateProjectionMatrix(),t.renderer.render(t.scene,t.camera);const n=t.renderer.domElement;(t.canvas.width!==n.width||t.canvas.height!==n.height)&&(t.canvas.width=n.width,t.canvas.height=n.height),t.context.clearRect(0,0,t.canvas.width,t.canvas.height),t.context.drawImage(n,0,0),t.dirty=!1}}}requestAnimationFrame(je)}kt();J();w();be(Ie);requestAnimationFrame(je);if(document.modelContext?.registerTool)try{Promise.resolve(document.modelContext.registerTool({name:"show_origami_step",description:"Show a paused folding step for the currently selected animal.",inputSchema:{type:"object",properties:{step:{type:"integer",minimum:1},progress:{type:"number",minimum:0,maximum:1}},required:["step","progress"],additionalProperties:!1},annotations:{readOnlyHint:!1},execute(a){if(!l||!a||!Number.isInteger(a.step)||a.step<1||a.step>l.frames.length||!Number.isFinite(a.progress)||a.progress<0||a.progress>1)throw Error("Invalid step or progress");return p=a.step-1,u=a.progress,d=!1,h=!1,v=!1,D(),w(),{step:p+1,progress:u,playing:d}}})).catch(console.error)}catch(a){console.error(a)}
