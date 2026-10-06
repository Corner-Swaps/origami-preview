import{M as Ue,O as $e,B as qe,F as be,S as Ee,U as Te,V as re,W as He,H as je,N as Qe,C as Ve,a as de,R as We,b as Xe,c as Ke,L as Ye,d as Ze,e as Je,A as et,f as tt,g as at,h as st,m as oe,i as ue,j as fe,P as pe,k as he,s as me,l as ke,n as K,o as ge,p as U,Q as Ce,v as it,q as nt,D as ye,r as rt}from"./patterns-zwrVWLYj.js";const ot={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class H{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const lt=new $e(-1,1,1,-1,0,1);class ct extends qe{constructor(){super(),this.setAttribute("position",new be([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new be([0,2,0,0,2,0],2))}}const dt=new ct;class Re{constructor(e){this._mesh=new Ue(dt,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,lt)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class ze extends H{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Ee?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Te.clone(e.uniforms),this.material=new Ee({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Re(this.material)}render(e,t,s){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=s.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class _e extends H{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,s){const i=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,c;this.inverse?(o=0,c=1):(o=1,c=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,o,4294967295),r.buffers.stencil.setClear(c),r.buffers.stencil.setLocked(!0),e.setRenderTarget(s),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),r.buffers.stencil.setLocked(!0)}}class ut extends H{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class ft{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const s=e.getSize(new re);this._width=s.width,this._height=s.height,t=new He(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:je}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new ze(ot),this.copyPass.material.blending=Qe,this.clock=new Ve}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let s=!1;for(let i=0,r=this.passes.length;i<r;i++){const o=this.passes[i];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,s),o.needsSwap){if(s){const c=this.renderer.getContext(),h=this.renderer.state.buffers.stencil;h.setFunc(c.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),h.setFunc(c.EQUAL,1,4294967295)}this.swapBuffers()}_e!==void 0&&(o instanceof _e?s=!0:o instanceof ut&&(s=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new re);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const s=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(s,i),this.renderTarget2.setSize(s,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(s,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class pt extends H{constructor(e,t,s=null,i=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=s,this.clearColor=i,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new de}render(e,t,s){const i=e.autoClear;e.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:s),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=i}}const ht={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new re(1/1024,1/512)}},vertexShader:`

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

		}`},V={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class mt extends H{constructor(){super(),this.uniforms=Te.clone(V.uniforms),this.material=new We({name:V.name,uniforms:this.uniforms,vertexShader:V.vertexShader,fragmentShader:V.fragmentShader}),this._fsQuad=new Re(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,s){this.uniforms.tDiffuse.value=s.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Xe.getTransfer(this._outputColorSpace)===Ke&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Ye?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Ze?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Je?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===et?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===tt?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===at?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===st&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const Ne=[{number:1,title:"First folds",animals:["Frog"]},{number:2,title:"Classic",animals:["Crane","Whale","Butterfly"]},{number:3,title:"Coming soon",animals:[]},{number:4,title:"Coming soon",animals:[]}],Fe=Ne.flatMap(a=>a.animals),Be={},gt=[],T=a=>document.getElementById(a),A=T("appDialog");let le;function $(){A.open&&A.close(),document.body.classList.remove("modal-open"),T("modalScrim").hidden=!0,document.querySelectorAll("#menu button").forEach(a=>{a.removeAttribute("aria-current")}),T("menu").style.setProperty("--active-tab",-1)}function vt(a){if(a==="fold"){$();return}le=document.activeElement,document.querySelectorAll(".panel-content>section").forEach(t=>t.hidden=t.id!==`panel-${a}`),T("panelTitle").textContent={steps:"Steps",color:"Paper color",paper:"Paper texture",models:"Origami library"}[a],document.body.classList.add("modal-open"),T("modalScrim").hidden=!1,A.open||A.showModal();const e={color:0,paper:1,models:2}[a];e!==void 0&&(T("menu").style.setProperty("--active-tab",e),document.querySelectorAll("#menu button").forEach((t,s)=>{t.toggleAttribute("aria-current",s===e)})),document.dispatchEvent(new CustomEvent("panel-open",{detail:a}))}function St(){document.querySelectorAll("[data-panel]").forEach(a=>a.addEventListener("click",()=>vt(a.dataset.panel))),T("closePanel").onclick=$,A.addEventListener("close",()=>{$(),le?.isConnected&&le.focus()}),A.addEventListener("click",a=>{if(a.target!==A)return;const e=A.getBoundingClientRect();(a.clientX<e.left||a.clientX>e.right||a.clientY<e.top||a.clientY>e.bottom)&&$()})}const n=a=>document.getElementById(a),ce=a=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${a}</svg>`,te={play:ce('<path d="m8 5 11 7-11 7z"/>'),pause:ce('<path d="M8 5v14M16 5v14"/>')},De=new URLSearchParams(document.location?.search||"").get("animal"),Oe=Fe.includes(De)?De:"Crane";let Z=Oe,l,f=0,p=0,u=!1,m=!1,x=!1,F=1,ae=0,z="#087b96",B="#ffffff",Y="solid",L=oe(Y,z),Me=null,y=null,E,N,g,d,v,R,_=!0,se=0;const W=new Map,q=new Map;St();function ve(a,e=!1){a.add(new nt(16777215,7899549,1.5));const t=new ye(16774887,2.5);t.position.set(-3.5,4,5),t.castShadow=e,e&&(t.shadow.mapSize.set(2048,2048),Object.assign(t.shadow.camera,{left:-3,right:3,top:3,bottom:-3,near:.1,far:20}),t.shadow.intensity=.12,t.shadow.bias=-3e-4,t.shadow.normalBias=.008),a.add(t);const s=new ye(13031926,.95);s.position.set(3,-1,-5),a.add(s)}function xt(){E=new ue({canvas:n("paper"),antialias:!0}),E.setPixelRatio(Math.min(devicePixelRatio||1,2)),E.shadowMap.enabled=!0,E.shadowMap.autoUpdate=!1,E.shadowMap.needsUpdate=!0,E.shadowMap.type=rt,N=new fe,N.background=new de("#ffffff"),g=new pe(36,1,.1,30),g.position.set(.5,3.2,4.2),d=new ge(g,n("paper")),d.enablePan=!1,d.zoomToCursor=!1,d.minDistance=1.5,d.maxDistance=12,d.maxPolarAngle=Math.PI*.55,d.minPolarAngle=Math.PI*.15,d.addEventListener("change",()=>_=!0),d.addEventListener("start",()=>{y=null}),ve(N,!1),R=new ft(E),R.addPass(new pt(N,g)),R.addPass(new mt);const a=new ze(ht);R.addPass(a);const e=()=>{const t=n("paper").getBoundingClientRect();if(!t.width||!t.height)return;E.setSize(t.width,t.height,!1),g.aspect=t.width/t.height,g.updateProjectionMatrix(),R.setSize(t.width,t.height);const s=E.getPixelRatio();a.uniforms.resolution.value.set(1/(t.width*s),1/(t.height*s)),_=!0};new ResizeObserver(e).observe(n("paper")),e(),n("paper").addEventListener("webglcontextlost",t=>{t.preventDefault(),u=!1,m=!1,x=!1,I("3D view interrupted","Reload this page to restore the graphics view.")})}async function Se(a){if(W.has(a))return W.get(a);const e=(async()=>{const t=await fetch(a==="Crane"?"./crane-motion.json":`./models/${a.toLowerCase()}.json`);if(!t.ok)throw Error("Model unavailable");const s=await t.json();if(it(s,a),s.complete!==!0)throw Error("Folding lesson is incomplete");return s})();W.set(a,e);try{return await e}catch(t){throw W.delete(a),t}}function I(a,e,t){n("modelMessage").hidden=!1,n("messageTitle").textContent=a,n("messageText").textContent=e,n("referenceLink").hidden=!0,n("playback").hidden=!0,n("stepCounter").hidden=!0}function wt(){y=null,v&&(N.remove(v),v.dispose(),v=null),l=null,u=!1,m=!1,x=!1,n("steps").replaceChildren(),_=!0}async function xe(a,e="default"){const t=++ae;if(Me?.(),Me=null,n("appSurface").style.minHeight="",n("videoLesson").hidden=!0,n("paper").hidden=!1,n("viewControls").hidden=!1,n("front").hidden=!1,n("back").hidden=!1,n("spatial").hidden=!1,n("menuColor").disabled=!1,n("menuPaper").disabled=!1,n("retry").hidden=!0,Z=a,document.title=a?`${a} — Origami`:"Origami",Ge(),E&&wt(),!a){n("paper").setAttribute("aria-label","Origami workspace"),I("Choose a model","Select a tutorial from Models to begin.");return}if(Be[a]){n("viewControls").hidden=!0,I(a,"The native 3D folding sequence is not ready yet. This animal cannot currently be folded in the app.");return}I("Loading…","");try{const s=await Se(a);if(t!==ae)return;E||xt(),l=s,f=0,p=0,u=!1,m=!1,x=!1,v=new he(l,L,{backColor:B}),v.rotation.set(Math.PI,Math.PI,0),N.add(v),d.target.set(0,0,0),J("front",5.2),n("modelMessage").hidden=!0,n("playback").hidden=!1,n("stepCounter").hidden=!1,yt(),P(),w()}catch(s){if(t!==ae)return;console.error(s),I("Unable to show the 3D model",/WebGL|context/i.test(s.message)?"3D graphics are unavailable in this browser. Try a browser with graphics acceleration enabled.":"The model could not load. Please try again."),n("retry").hidden=!1,n("retry").onclick=()=>{n("retry").hidden=!0,xe(a)}}}function bt(){return l.surfaceMarks&&f===l.frames.length-1&&p===1?[]:[...new Set(l.activeEdges.slice(0,f+(p>=1?1:0)).flat())]}function Et(){if(!v||!g||!d||!l||!v.geometry.boundingSphere)return;v.updateMatrixWorld();const a=v.geometry.boundingSphere,e=d.target,s=a.center.clone().applyMatrix4(v.matrixWorld).distanceTo(e)+a.radius,i=Math.tan(U.degToRad(g.fov/2)),r=Math.min(i,i*g.aspect);if(!(r>0))return;const o=U.clamp(s/r*1.12,d.minDistance,d.maxDistance),c=g.position.distanceTo(e);if(c<o-1e-6){const h=g.position.clone().sub(e).normalize();g.position.copy(e).addScaledVector(h,U.lerp(c,o,.25)),d.update(),_=!0}}function P(){!v||!l||(v.update(me(l,f,p),bt(),p<1?l.activeEdges[f]:[]),Et(),Ct(),E.shadowMap.needsUpdate=!0,_=!0)}let Pe=-1,ie=null;function Ct(){const a=n("creaseDiagram");if(!a)return;if(!l||!l.activeEdges){a.innerHTML="",ie=null;return}if(ie===l&&Pe===f)return;ie=l,Pe=f;const e=new Set(l.activeEdges.flat());if(!e.size){a.innerHTML="";return}const t=new Set(l.activeEdges[f]||[]),s=new Set(l.activeEdges[f+1]||[]),i=l.flat;let r=1e9,o=-1e9,c=1e9,h=-1e9;for(const M of e){const[j,Q]=l.edges[M];for(const k of[j,Q])r=Math.min(r,i[k][0]),o=Math.max(o,i[k][0]),c=Math.min(c,i[k][2]),h=Math.max(h,i[k][2])}const C=100,S=100,b=8,O=M=>(b+(M-r)/(o-r||1)*(C-2*b)).toFixed(1),G=M=>(b+(M-c)/(h-c||1)*(S-2*b)).toFixed(1);let D="";for(const M of e){const[j,Q]=l.edges[M],k=t.has(M)?"crease active":s.has(M)?"crease next":"crease";D+=`<line x1="${O(i[j][0])}" y1="${G(i[j][2])}" x2="${O(i[Q][0])}" y2="${G(i[Q][2])}" class="${k}"/>`}a.setAttribute("viewBox",`0 0 ${C} ${S}`),a.innerHTML=D}function yt(){const a=l.titles||gt;n("steps").replaceChildren(...a.map((e,t)=>{const s=document.createElement("button");s.className="step",s.dataset.step=t;const i=document.createElement("span");i.className="number",i.textContent=t+1;const r=document.createElement("span");return r.textContent=e,s.append(i,r),s.onclick=()=>{f=t,p=0,u=!1,m=!1,x=!1,P(),w(),$()},s}))}function w(){n("speed").textContent=`${F}×`,n("speed").setAttribute("aria-label",`Playback speed ${F} times. Change to ${F%3+1} times`);const a=l?.frames.length||0;n("stepCounter").textContent=`${Z||"Origami"} – ${l?.motions?.[f]?.type==="cut"?"Cut":"Step"} ${f+1} / ${a}`,n("play").innerHTML=u&&!m?te.pause:te.play,n("play").setAttribute("aria-label",u&&!m?"Pause step":p===1?"Replay step":"Play step"),n("play").title=n("play").getAttribute?.("aria-label")||"Play step",n("play").setAttribute("aria-pressed",String(u&&!m)),n("playAll").innerHTML=u&&m?te.pause:ce('<path d="M5 12h14m-6-6 6 6-6 6"/>'),n("playAll").setAttribute("aria-label",u&&m?"Pause continuous playback":"Play all remaining steps"),n("playAll").title=u&&m?"Pause all":"Play all",n("playAll").setAttribute("aria-pressed",String(u&&m)),n("progress").value=Math.round(p*1e3),n("progress").style.setProperty("--fold-progress",`${p*100}%`),n("prev").disabled=!l||f===0,n("next").disabled=!l||f===a-1&&p===1,n("next").textContent=f===a-1?"Finish":"Next Step",document.querySelectorAll("#steps .step").forEach((e,t)=>{t===f?e.setAttribute("aria-current","step"):e.removeAttribute("aria-current")})}function we(){x=!1,f<l.frames.length-1?(f++,p=0,u=!0):(u=!1,m=!1),P(),w()}n("play").onclick=()=>{if(!l)return;const a=m;m=!1,p===1&&(p=0),u=a||!u,u||(x=!1),P(),w()};n("speed").onclick=()=>{F=F%3+1,w()};n("playAll").onclick=()=>{if(l){if(u&&m){u=!1,m=!1,x=!1,w();return}if(m=!0,x=!1,p>=1){if(f<l.frames.length-1){we();return}f=0,p=0}u=!0,P(),w()}};n("prev").onclick=()=>{!l||f===0||(y=null,f--,p=1,u=!1,m=!1,x=!1,P(),w())};n("next").onclick=()=>{if(l){if(p>=1){we();return}x=!0,u=!0,w()}};n("progress").oninput=a=>{l&&(y=null,u=!1,m=!1,x=!1,p=Number(a.target.value)/1e3,P(),w())};const _t=["front","back","spatial"];function J(a,e){if(!d)return;y=null;const t=d.target,s=e??g.position.distanceTo(t);g.up.set(0,1,0),a==="front"?g.position.set(t.x,t.y,t.z+s):a==="back"&&g.position.set(t.x,t.y,t.z-s),d.minPolarAngle=Math.PI*.15,d.maxPolarAngle=Math.PI*.55,d.enableRotate=a==="spatial",d.update();for(const i of _t)n(i).setAttribute("aria-pressed",String(i===a));n("paper").setAttribute("aria-label",`${Z||"Origami"} origami model, ${a} view. `+(a==="spatial"?"Drag to rotate; pinch or scroll to zoom.":"Pinch or scroll to zoom.")),_=!0}n("front").onclick=()=>J("front");n("back").onclick=()=>J("back");n("spatial").onclick=()=>J("spatial");for(const[a,e]of[["zoomIn",1/1.2],["zoomOut",1.2]])n(a).onclick=()=>{if(!d||!l)return;y=null;const t=g.position.clone().sub(d.target),s=U.clamp(t.length()*e,d.minDistance,d.maxDistance);g.position.copy(d.target).add(t.setLength(s)),d.update(),_=!0};function Dt(a){const e=new de(a);return .2126*e.r+.7152*e.g+.0722*e.b>.72&&e.multiplyScalar(.42),"#"+e.getHexString()}function ee(a=!1){const e=L;L=oe(Y,z),v&&(v.setTexture(L),v.setBackColor(B));for(const s of q.values())s.paper.setTexture(L),s.paper.setBackColor(B),s.dirty=!0;e.dispose();const t=Dt(z);document.documentElement.style.setProperty("--control-accent",t),a&&document.documentElement.style.setProperty("--accent",t),document.querySelectorAll("[data-color]").forEach(s=>s.setAttribute("aria-pressed",String(s.dataset.color===z))),document.querySelectorAll("[data-back]").forEach(s=>s.setAttribute("aria-pressed",String(s.dataset.back.toLowerCase()===B.toLowerCase()))),document.querySelectorAll("[data-pattern]").forEach(s=>{s.setAttribute("aria-pressed",String(s.dataset.pattern===Y));const i=oe(s.dataset.pattern,z);s.querySelector(".pattern-preview").style.backgroundImage=`url(${i.image.toDataURL()})`,i.dispose()}),_=!0}function Mt(){const a=n("backSwatches");if(!a||a.dataset.built)return;a.dataset.built="1";const e=new Set(["#ffffff"]);for(const t of document.querySelectorAll("[data-color]")){const s=t.dataset.color.toLowerCase();if(e.has(s))continue;e.add(s);const i=document.createElement("button");i.className="back-choice",i.dataset.back=t.dataset.color,i.setAttribute("aria-label",t.getAttribute("aria-label")),i.setAttribute("aria-pressed","false");const r=document.createElement("span");r.className="swatch-circle",r.style.background=t.dataset.color;const o=document.createElement("span");o.textContent=t.getAttribute("aria-label"),i.append(r,o),a.appendChild(i)}}document.querySelectorAll("[data-color]").forEach(a=>a.onclick=()=>{z=a.dataset.color,ee(!0)});document.querySelectorAll("[data-pattern]").forEach(a=>a.onclick=()=>{Y=a.dataset.pattern,ee()});Mt();document.querySelectorAll("[data-back]").forEach(a=>a.onclick=()=>{B=a.dataset.back,ee()});function Pt(){const a=n("levelRows");a.innerHTML="";for(const e of Ne){const t=document.createElement("div");t.className="level-row";const s=document.createElement("div");s.className="level-indicator";const i=document.createElement("div");i.className="level-circle",i.textContent=e.number;const r=document.createElement("div");r.className="level-label",r.textContent=`Level ${e.number}`,s.append(i,r),t.append(s);const o=document.createElement("div");if(o.className="level-models",e.animals.length)for(const c of e.animals){const h=document.createElement("button");h.className="model-item",h.dataset.animal=c,h.setAttribute("aria-label",`${c} — preview finished model`);const C=document.createElement("canvas");C.className="model-preview",C.setAttribute("aria-hidden","true");const S=document.createElement("span");S.className="model-name",S.textContent=c,h.append(C,S),h.onclick=()=>At(c,h),o.append(h)}else{const c=document.createElement("div");c.className="coming-soon",c.setAttribute("aria-label",`Level ${e.number} coming soon`),c.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg><span>Coming soon</span>',o.append(c)}t.append(o),a.append(t)}Ge()}function Ge(){document.querySelectorAll(".model-item").forEach(a=>{a.classList.toggle("selected",a.dataset.animal===Z)})}let X=null;function At(a,e){e.classList.add("pumping"),document.querySelectorAll(".model-item").forEach(t=>{t!==e&&t.classList.add("faded")}),setTimeout(()=>Lt(a),380)}async function Lt(a){const e=n("previewModal");e.hidden=!1,n("previewName").textContent=a,n("previewStart").onclick=()=>{Ae(),xe(a)},n("previewClose").onclick=Ae;const t=n("previewBig");try{const s=await Se(a),i=new ue({canvas:t,alpha:!0,antialias:!0});i.setPixelRatio(Math.min(devicePixelRatio||1,2));const r=new fe,o=new pe(36,1,.1,30),c=new he(s,L,{backColor:B});c.rotation.set(Math.PI,Math.PI,0);const h=c.update(me(s,s.frames.length-1,1));r.add(c),ve(r);const C=new ke().setFromObject(c),S=C.getSize(new K).length();o.position.copy(h).add(new K(.5,.35,1).normalize().multiplyScalar(Math.max(1,S*1.6)));const b=new ge(o,t);b.target.copy(h),b.enablePan=!1,b.update();const O=()=>{const D=t.getBoundingClientRect();D.width&&D.height&&(i.setSize(D.width,D.height,!1),o.aspect=D.width/D.height,o.updateProjectionMatrix())};O(),new ResizeObserver(O).observe(t);const G=()=>{e.hidden||(i.render(r,o),requestAnimationFrame(G))};G(),X={renderer:i,scene:r,camera:o,paper:c,controls:b}}catch(s){console.warn("Big preview unavailable:",a,s)}}function Ae(){n("previewModal").hidden=!0,X&&(X.renderer.dispose(),X=null),document.querySelectorAll(".model-item").forEach(a=>a.classList.remove("pumping","faded"))}let ne=!1,Le;async function Tt(){if(!ne){ne=!0;for(const a of Fe.filter(e=>!Be[e]))if(!q.has(a))try{const e=await Se(a),t=document.querySelector(`[data-animal="${a}"] .model-preview`),s=Le||(Le=new ue({canvas:document.createElement("canvas"),alpha:!0,antialias:!0,preserveDrawingBuffer:!0}));s.setPixelRatio(Math.min(devicePixelRatio||1,1.5));const i=new fe,r=new pe(36,1,.1,30),o=new he(e,L),c=o.update(me(e,e.frames.length-1,1));i.add(o),ve(i);const h=new ke().setFromObject(o),C=h.getSize(new K).length();r.position.copy(c).add(new K(e.cuts?.6:a.startsWith("Dinosaur")?.55:.48,e.cuts?-.6:a.startsWith("Dinosaur")?.25:.3,1).normalize().multiplyScalar(Math.max(1,C*1.55)));const S=new ge(r,t);S.target.copy(c),S.enablePan=!1,S.enableZoom=!1,S.update();const b={renderer:s,scene:i,camera:r,paper:o,controls:S,canvas:t,context:t.getContext("2d"),dirty:!0};S.addEventListener("change",()=>b.dirty=!0),q.set(a,b),new ResizeObserver(()=>b.dirty=!0).observe(t)}catch(e){console.warn(`Preview unavailable: ${a}`,e),document.querySelector(`[data-animal="${a}"] canvas`).setAttribute("aria-label",`${a} preview unavailable. Click to select.`)}ne=!1}}document.addEventListener("panel-open",a=>{if(y=null,u=!1,m=!1,x=!1,w(),a.detail==="models"){Tt();for(const e of q.values())e.dirty=!0}});function Ie(a){const e=se?Math.min((a-se)/1e3,.05):0;if(se=a,l&&!document.hidden){if(u&&!(y?.prepare&&p===0)){const t=l.motions?.[f],s=t?.type==="foundation"?l.foundation.motions[t.step]:t,i=s?.type==="cut"?12:s?.type==="panel-tree"||(s?.curve?.length||0)>1?7.2:5.6;p=Math.min(1,p+e*(x?3:F)/i),p===1&&(u=!1),P(),p===1&&(x||m)?we():w()}if(y){const t=y;t.elapsed=Math.min(1,t.elapsed+e/t.duration);const s=t.elapsed,i=s*s*s*(s*(s*6-15)+10),r=U.lerp(t.from.length(),t.to.length(),i),o=t.from.clone().normalize(),c=t.to.clone().normalize(),h=new Ce().setFromUnitVectors(o,c),C=o.applyQuaternion(new Ce().slerp(h,i)).multiplyScalar(r);g.position.copy(d.target).add(C),d.update(),_=!0,t.elapsed===1&&(y=null)}}if(E&&_&&(R.render(),_=!1),n("appDialog").open&&!n("panel-models").hidden){for(const t of q.values())if(t.dirty){const s=t.canvas.getBoundingClientRect();if(s.width&&s.height){t.renderer.setSize(s.width,s.height,!1),t.camera.aspect=s.width/s.height,t.camera.updateProjectionMatrix(),t.renderer.render(t.scene,t.camera);const i=t.renderer.domElement;(t.canvas.width!==i.width||t.canvas.height!==i.height)&&(t.canvas.width=i.width,t.canvas.height=i.height),t.context.clearRect(0,0,t.canvas.width,t.canvas.height),t.context.drawImage(i,0,0),t.dirty=!1}}}requestAnimationFrame(Ie)}Pt();ee();w();xe(Oe);requestAnimationFrame(Ie);if(document.modelContext?.registerTool)try{Promise.resolve(document.modelContext.registerTool({name:"show_origami_step",description:"Show a paused folding step for the currently selected animal.",inputSchema:{type:"object",properties:{step:{type:"integer",minimum:1},progress:{type:"number",minimum:0,maximum:1}},required:["step","progress"],additionalProperties:!1},annotations:{readOnlyHint:!1},execute(a){if(!l||!a||!Number.isInteger(a.step)||a.step<1||a.step>l.frames.length||!Number.isFinite(a.progress)||a.progress<0||a.progress>1)throw Error("Invalid step or progress");return f=a.step-1,p=a.progress,u=!1,m=!1,x=!1,P(),w(),{step:f+1,progress:p,playing:u}}})).catch(console.error)}catch(a){console.error(a)}
