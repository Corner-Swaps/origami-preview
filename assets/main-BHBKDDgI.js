import{M as Qe,O as Ve,B as We,F as ye,S as Ce,U as Re,V as re,W as Xe,H as Ke,N as Ye,C as Ze,a as ue,R as Je,b as et,c as tt,L as at,d as it,e as st,A as nt,f as rt,g as ot,h as lt,m as oe,i as fe,j as pe,P as he,k as me,s as ge,l as ze,n as X,o as ve,p as U,Q as _e,v as ct,q as dt,D as De,r as ut}from"./patterns-zwrVWLYj.js";const ft={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class q{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const pt=new Ve(-1,1,1,-1,0,1);class ht extends We{constructor(){super(),this.setAttribute("position",new ye([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ye([0,2,0,0,2,0],2))}}const mt=new ht;class Ne{constructor(e){this._mesh=new Qe(mt,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,pt)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Fe extends q{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Ce?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Re.clone(e.uniforms),this.material=new Ce({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Ne(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Me extends q{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,c;this.inverse?(o=0,c=1):(o=1,c=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(c),r.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class gt extends q{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class vt{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new re);this._width=i.width,this._height=i.height,t=new Xe(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Ke}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Fe(ft),this.copyPass.material.blending=Ye,this.clock=new Ze}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let s=0,r=this.passes.length;s<r;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),o.needsSwap){if(i){const c=this.renderer.getContext(),h=this.renderer.state.buffers.stencil;h.setFunc(c.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),h.setFunc(c.EQUAL,1,4294967295)}this.swapBuffers()}Me!==void 0&&(o instanceof Me?i=!0:o instanceof gt&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new re);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class St extends q{constructor(e,t,i=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new ue}render(e,t,i){const s=e.autoClear;e.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=s}}const xt={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new re(1/1024,1/512)}},vertexShader:`

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

		}`},Q={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class bt extends q{constructor(){super(),this.uniforms=Re.clone(Q.uniforms),this.material=new Je({name:Q.name,uniforms:this.uniforms,vertexShader:Q.vertexShader,fragmentShader:Q.fragmentShader}),this._fsQuad=new Ne(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},et.getTransfer(this._outputColorSpace)===tt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===at?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===it?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===st?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===nt?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===rt?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===ot?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===lt&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const Be=[{number:1,title:"First folds",animals:["Frog"]},{number:2,title:"Classic",animals:["Crane","Whale","Butterfly"]},{number:3,title:"Coming soon",animals:[]},{number:4,title:"Coming soon",animals:[]}],Oe=Be.flatMap(a=>a.animals),Ge={},wt=[],T=a=>document.getElementById(a),A=T("appDialog");let le;function ee(){A.open&&A.close(),document.body.classList.remove("modal-open"),T("modalScrim").hidden=!0,document.querySelectorAll("#menu button").forEach(a=>{a.removeAttribute("aria-current")}),T("menu").style.setProperty("--active-tab",-1)}function Et(a){le=document.activeElement,document.querySelectorAll(".panel-content>section").forEach(t=>t.hidden=t.id!==`panel-${a}`),T("panelTitle").textContent={color:"Paper color",paper:"Paper texture",models:"Origami library"}[a],document.body.classList.add("modal-open"),T("modalScrim").hidden=!1,A.open||A.showModal();const e={color:0,paper:1,models:2}[a];e!==void 0&&(T("menu").style.setProperty("--active-tab",e),document.querySelectorAll("#menu button").forEach((t,i)=>{t.toggleAttribute("aria-current",i===e)})),document.dispatchEvent(new CustomEvent("panel-open",{detail:a}))}function yt(){document.querySelectorAll("[data-panel]").forEach(a=>a.addEventListener("click",()=>Et(a.dataset.panel))),T("closePanel").onclick=ee,A.addEventListener("close",()=>{ee(),le?.isConnected&&le.focus()}),A.addEventListener("click",a=>{if(a.target!==A)return;const e=A.getBoundingClientRect();(a.clientX<e.left||a.clientX>e.right||a.clientY<e.top||a.clientY>e.bottom)&&ee()})}const n=a=>document.getElementById(a),ce=a=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${a}</svg>`,te={play:ce('<path d="m8 5 11 7-11 7z"/>'),pause:ce('<path d="M8 5v14M16 5v14"/>')},Pe=new URLSearchParams(document.location?.search||"").get("animal"),Ie=Oe.includes(Pe)?Pe:"Crane";let Y=Ie,l,f=0,p=0,u=!1,m=!1,x=!1,F=1,ae=0,z="#087b96",B="#ffffff",K="solid",L=oe(K,z),Ae=null,C=null,E,N,g,d,v,R,_=!0,ie=0;const V=new Map,$=new Map;yt();function Se(a,e=!1){a.add(new dt(16777215,7899549,1.5));const t=new De(16774887,2.5);t.position.set(-3.5,4,5),t.castShadow=e,e&&(t.shadow.mapSize.set(2048,2048),Object.assign(t.shadow.camera,{left:-3,right:3,top:3,bottom:-3,near:.1,far:20}),t.shadow.intensity=.12,t.shadow.bias=-3e-4,t.shadow.normalBias=.008),a.add(t);const i=new De(13031926,.95);i.position.set(3,-1,-5),a.add(i)}function Ct(){E=new fe({canvas:n("paper"),antialias:!0}),E.setPixelRatio(Math.min(devicePixelRatio||1,2)),E.shadowMap.enabled=!0,E.shadowMap.autoUpdate=!1,E.shadowMap.needsUpdate=!0,E.shadowMap.type=ut,N=new pe,N.background=new ue("#ffffff"),g=new he(36,1,.1,30),g.position.set(.5,3.2,4.2),d=new ve(g,n("paper")),d.enablePan=!1,d.zoomToCursor=!1,d.minDistance=1.5,d.maxDistance=12,d.maxPolarAngle=Math.PI*.55,d.minPolarAngle=Math.PI*.15,d.addEventListener("change",()=>_=!0),d.addEventListener("start",()=>{C=null}),Se(N,!1),R=new vt(E),R.addPass(new St(N,g)),R.addPass(new bt);const a=new Fe(xt);R.addPass(a);const e=()=>{const t=n("paper").getBoundingClientRect();if(!t.width||!t.height)return;E.setSize(t.width,t.height,!1),g.aspect=t.width/t.height,g.updateProjectionMatrix(),R.setSize(t.width,t.height);const i=E.getPixelRatio();a.uniforms.resolution.value.set(1/(t.width*i),1/(t.height*i)),_=!0};new ResizeObserver(e).observe(n("paper")),e(),n("paper").addEventListener("webglcontextlost",t=>{t.preventDefault(),u=!1,m=!1,x=!1,I("3D view interrupted","Reload this page to restore the graphics view.")})}async function xe(a){if(V.has(a))return V.get(a);const e=(async()=>{const t=await fetch(a==="Crane"?"./crane-motion.json":`./models/${a.toLowerCase()}.json`);if(!t.ok)throw Error("Model unavailable");const i=await t.json();if(ct(i,a),i.complete!==!0)throw Error("Folding lesson is incomplete");return i})();V.set(a,e);try{return await e}catch(t){throw V.delete(a),t}}function I(a,e,t){n("modelMessage").hidden=!1,n("messageTitle").textContent=a,n("messageText").textContent=e,n("referenceLink").hidden=!0,n("playback").hidden=!0,n("stepPillWrap").hidden=!0,we(!1)}function _t(){C=null,v&&(N.remove(v),v.dispose(),v=null),l=null,u=!1,m=!1,x=!1,n("steps").replaceChildren(),_=!0}async function be(a,e="default"){const t=++ae;if(Ae?.(),Ae=null,n("appSurface").style.minHeight="",n("videoLesson").hidden=!0,n("paper").hidden=!1,n("viewControls").hidden=!1,n("front").hidden=!1,n("back").hidden=!1,n("spatial").hidden=!1,n("menuColor").disabled=!1,n("menuPaper").disabled=!1,n("retry").hidden=!0,Y=a,document.title=a?`${a} — Origami`:"Origami",He(),E&&_t(),!a){n("paper").setAttribute("aria-label","Origami workspace"),I("Choose a model","Select a tutorial from Models to begin.");return}if(Ge[a]){n("viewControls").hidden=!0,I(a,"The native 3D folding sequence is not ready yet. This animal cannot currently be folded in the app.");return}I("Loading…","");try{const i=await xe(a);if(t!==ae)return;E||Ct(),l=i,f=0,p=0,u=!1,m=!1,x=!1,v=new me(l,L,{backColor:B}),v.rotation.set(Math.PI,Math.PI,0),N.add(v),d.target.set(0,0,0),Z("front",5.2),n("modelMessage").hidden=!0,n("playback").hidden=!1,n("stepPillWrap").hidden=!1,At(),P(),b()}catch(i){if(t!==ae)return;console.error(i),I("Unable to show the 3D model",/WebGL|context/i.test(i.message)?"3D graphics are unavailable in this browser. Try a browser with graphics acceleration enabled.":"The model could not load. Please try again."),n("retry").hidden=!1,n("retry").onclick=()=>{n("retry").hidden=!0,be(a)}}}function Dt(){return l.surfaceMarks&&f===l.frames.length-1&&p===1?[]:[...new Set(l.activeEdges.slice(0,f+(p>=1?1:0)).flat())]}function Mt(){if(!v||!g||!d||!l||!v.geometry.boundingSphere)return;v.updateMatrixWorld();const a=v.geometry.boundingSphere,e=d.target,i=a.center.clone().applyMatrix4(v.matrixWorld).distanceTo(e)+a.radius,s=Math.tan(U.degToRad(g.fov/2)),r=Math.min(s,s*g.aspect);if(!(r>0))return;const o=U.clamp(i/r*1.12,d.minDistance,d.maxDistance),c=g.position.distanceTo(e);if(c<o-1e-6){const h=g.position.clone().sub(e).normalize();g.position.copy(e).addScaledVector(h,U.lerp(c,o,.25)),d.update(),_=!0}}function P(){!v||!l||(v.update(ge(l,f,p),Dt(),p<1?l.activeEdges[f]:[]),Mt(),Pt(),E.shadowMap.needsUpdate=!0,_=!0)}let Le=-1,se=null;function Pt(){const a=n("creaseDiagram");if(!a)return;if(!l||!l.activeEdges){a.innerHTML="",se=null;return}if(se===l&&Le===f)return;se=l,Le=f;const e=new Set(l.activeEdges.flat());if(!e.size){a.innerHTML="";return}const t=new Set(l.activeEdges[f]||[]),i=new Set(l.activeEdges[f+1]||[]),s=l.flat;let r=1e9,o=-1e9,c=1e9,h=-1e9;for(const M of e){const[H,j]=l.edges[M];for(const k of[H,j])r=Math.min(r,s[k][0]),o=Math.max(o,s[k][0]),c=Math.min(c,s[k][2]),h=Math.max(h,s[k][2])}const y=100,S=100,w=8,O=M=>(w+(M-r)/(o-r||1)*(y-2*w)).toFixed(1),G=M=>(w+(M-c)/(h-c||1)*(S-2*w)).toFixed(1);let D="";for(const M of e){const[H,j]=l.edges[M],k=t.has(M)?"crease active":i.has(M)?"crease next":"crease";D+=`<line x1="${O(s[H][0])}" y1="${G(s[H][2])}" x2="${O(s[j][0])}" y2="${G(s[j][2])}" class="${k}"/>`}a.setAttribute("viewBox",`0 0 ${y} ${S}`),a.innerHTML=D}function At(){const a=l.titles||wt;n("steps").replaceChildren(...a.map((e,t)=>{const i=document.createElement("button");i.className="step",i.dataset.step=t,i.setAttribute("role","option");const s=document.createElement("span");s.className="number",s.textContent=t+1;const r=document.createElement("span");return r.textContent=e,i.append(s,r),i.onclick=()=>{f=t,p=0,u=!1,m=!1,x=!1,P(),b(),we(!1)},i}))}function we(a){const e=n("stepDropdown"),t=n("stepCounter"),i=n("stepPillArrow");if(!e)return;const s=a??e.hidden;e.hidden=!s,t.setAttribute("aria-expanded",String(s)),i.textContent=s?"✕":"▾",s&&e.querySelector("[aria-current]")?.scrollIntoView({block:"nearest"})}function b(){n("speed").textContent=`${F}×`,n("speed").setAttribute("aria-label",`Playback speed ${F} times. Change to ${F%3+1} times`);const a=l?.frames.length||0,e=(l?.titles||[])[f]||"";n("stepPillText").textContent=l?`Step ${f+1} – ${e}`:`${Y||"Origami"}`,n("play").innerHTML=u&&!m?te.pause:te.play,n("play").setAttribute("aria-label",u&&!m?"Pause step":p===1?"Replay step":"Play step"),n("play").title=n("play").getAttribute?.("aria-label")||"Play step",n("play").setAttribute("aria-pressed",String(u&&!m)),n("playAll").innerHTML=u&&m?te.pause:ce('<path d="M5 12h14m-6-6 6 6-6 6"/>'),n("playAll").setAttribute("aria-label",u&&m?"Pause continuous playback":"Play all remaining steps"),n("playAll").title=u&&m?"Pause all":"Play all",n("playAll").setAttribute("aria-pressed",String(u&&m)),n("progress").value=Math.round(p*1e3),n("progress").style.setProperty("--fold-progress",`${p*100}%`),n("prev").disabled=!l||f===0,n("next").disabled=!l||f===a-1&&p===1,n("next").textContent=f===a-1?"Finish":"Next Step",document.querySelectorAll("#steps .step").forEach((t,i)=>{i===f?t.setAttribute("aria-current","step"):t.removeAttribute("aria-current")})}function Ee(){x=!1,f<l.frames.length-1?(f++,p=0,u=!0):(u=!1,m=!1),P(),b()}n("play").onclick=()=>{if(!l)return;const a=m;m=!1,p===1&&(p=0),u=a||!u,u||(x=!1),P(),b()};n("stepCounter").onclick=()=>{l&&we()};function Ue(a){document.body.classList.toggle("mobile-layout",a),n("mobileToggle").setAttribute("aria-pressed",String(a))}let de=null;n("mobileToggle").onclick=()=>{de=!document.body.classList.contains("mobile-layout"),Ue(de)};const $e=matchMedia("(max-width:600px)");function qe(){de===null&&Ue($e.matches)}$e.addEventListener("change",qe);qe();n("speed").onclick=()=>{F=F%3+1,b()};n("playAll").onclick=()=>{if(l){if(u&&m){u=!1,m=!1,x=!1,b();return}if(m=!0,x=!1,p>=1){if(f<l.frames.length-1){Ee();return}f=0,p=0}u=!0,P(),b()}};n("prev").onclick=()=>{!l||f===0||(C=null,f--,p=1,u=!1,m=!1,x=!1,P(),b())};n("next").onclick=()=>{if(l){if(p>=1){Ee();return}x=!0,u=!0,b()}};n("progress").oninput=a=>{l&&(C=null,u=!1,m=!1,x=!1,p=Number(a.target.value)/1e3,P(),b())};const Lt=["front","back","spatial"];function Z(a,e){if(!d)return;C=null;const t=d.target,i=e??g.position.distanceTo(t);g.up.set(0,1,0),a==="front"?g.position.set(t.x,t.y,t.z+i):a==="back"&&g.position.set(t.x,t.y,t.z-i),d.minPolarAngle=Math.PI*.15,d.maxPolarAngle=Math.PI*.55,d.enableRotate=a==="spatial",d.update();for(const s of Lt)n(s).setAttribute("aria-pressed",String(s===a));n("paper").setAttribute("aria-label",`${Y||"Origami"} origami model, ${a} view. `+(a==="spatial"?"Drag to rotate; pinch or scroll to zoom.":"Pinch or scroll to zoom.")),_=!0}n("front").onclick=()=>Z("front");n("back").onclick=()=>Z("back");n("spatial").onclick=()=>Z("spatial");for(const[a,e]of[["zoomIn",1/1.2],["zoomOut",1.2]])n(a).onclick=()=>{if(!d||!l)return;C=null;const t=g.position.clone().sub(d.target),i=U.clamp(t.length()*e,d.minDistance,d.maxDistance);g.position.copy(d.target).add(t.setLength(i)),d.update(),_=!0};function Tt(a){const e=new ue(a);return .2126*e.r+.7152*e.g+.0722*e.b>.72&&e.multiplyScalar(.42),"#"+e.getHexString()}function J(a=!1){const e=L;L=oe(K,z),v&&(v.setTexture(L),v.setBackColor(B));for(const i of $.values())i.paper.setTexture(L),i.paper.setBackColor(B),i.dirty=!0;e.dispose();const t=Tt(z);document.documentElement.style.setProperty("--control-accent",t),a&&document.documentElement.style.setProperty("--accent",t),document.querySelectorAll("[data-color]").forEach(i=>i.setAttribute("aria-pressed",String(i.dataset.color===z))),document.querySelectorAll("[data-back]").forEach(i=>i.setAttribute("aria-pressed",String(i.dataset.back.toLowerCase()===B.toLowerCase()))),document.querySelectorAll("[data-pattern]").forEach(i=>{i.setAttribute("aria-pressed",String(i.dataset.pattern===K));const s=oe(i.dataset.pattern,z);i.querySelector(".pattern-preview").style.backgroundImage=`url(${s.image.toDataURL()})`,s.dispose()}),_=!0}function kt(){const a=n("backSwatches");if(!a||a.dataset.built)return;a.dataset.built="1";const e=new Set(["#ffffff"]);for(const t of document.querySelectorAll("[data-color]")){const i=t.dataset.color.toLowerCase();if(e.has(i))continue;e.add(i);const s=document.createElement("button");s.className="back-choice",s.dataset.back=t.dataset.color,s.setAttribute("aria-label",t.getAttribute("aria-label")),s.setAttribute("aria-pressed","false");const r=document.createElement("span");r.className="swatch-circle",r.style.background=t.dataset.color;const o=document.createElement("span");o.textContent=t.getAttribute("aria-label"),s.append(r,o),a.appendChild(s)}}document.querySelectorAll("[data-color]").forEach(a=>a.onclick=()=>{z=a.dataset.color,J(!0)});document.querySelectorAll("[data-pattern]").forEach(a=>a.onclick=()=>{K=a.dataset.pattern,J()});kt();document.querySelectorAll("[data-back]").forEach(a=>a.onclick=()=>{B=a.dataset.back,J()});function Rt(){const a=n("levelRows");a.innerHTML="";for(const e of Be){const t=document.createElement("div");t.className="level-row";const i=document.createElement("div");i.className="level-indicator";const s=document.createElement("div");s.className="level-circle",s.textContent=e.number;const r=document.createElement("div");r.className="level-label",r.textContent=`Level ${e.number}`,i.append(s,r),t.append(i);const o=document.createElement("div");if(o.className="level-models",e.animals.length)for(const c of e.animals){const h=document.createElement("button");h.className="model-item",h.dataset.animal=c,h.setAttribute("aria-label",`${c} — preview finished model`);const y=document.createElement("canvas");y.className="model-preview",y.setAttribute("aria-hidden","true");const S=document.createElement("span");S.className="model-name",S.textContent=c,h.append(y,S),h.onclick=()=>zt(c,h),o.append(h)}else{const c=document.createElement("div");c.className="coming-soon",c.setAttribute("aria-label",`Level ${e.number} coming soon`),c.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg><span>Coming soon</span>',o.append(c)}t.append(o),a.append(t)}He()}function He(){document.querySelectorAll(".model-item").forEach(a=>{a.classList.toggle("selected",a.dataset.animal===Y)})}let W=null;function zt(a,e){e.classList.add("pumping"),document.querySelectorAll(".model-item").forEach(t=>{t!==e&&t.classList.add("faded")}),setTimeout(()=>Nt(a),380)}async function Nt(a){const e=n("previewModal");e.hidden=!1,n("previewName").textContent=a,n("previewStart").onclick=()=>{Te(),be(a)},n("previewClose").onclick=Te;const t=n("previewBig");try{const i=await xe(a),s=new fe({canvas:t,alpha:!0,antialias:!0});s.setPixelRatio(Math.min(devicePixelRatio||1,2));const r=new pe,o=new he(36,1,.1,30),c=new me(i,L,{backColor:B});c.rotation.set(Math.PI,Math.PI,0);const h=c.update(ge(i,i.frames.length-1,1));r.add(c),Se(r);const y=new ze().setFromObject(c),S=y.getSize(new X).length();o.position.copy(h).add(new X(.5,.35,1).normalize().multiplyScalar(Math.max(1,S*1.6)));const w=new ve(o,t);w.target.copy(h),w.enablePan=!1,w.update();const O=()=>{const D=t.getBoundingClientRect();D.width&&D.height&&(s.setSize(D.width,D.height,!1),o.aspect=D.width/D.height,o.updateProjectionMatrix())};O(),new ResizeObserver(O).observe(t);const G=()=>{e.hidden||(s.render(r,o),requestAnimationFrame(G))};G(),W={renderer:s,scene:r,camera:o,paper:c,controls:w}}catch(i){console.warn("Big preview unavailable:",a,i)}}function Te(){n("previewModal").hidden=!0,W&&(W.renderer.dispose(),W=null),document.querySelectorAll(".model-item").forEach(a=>a.classList.remove("pumping","faded"))}let ne=!1,ke;async function Ft(){if(!ne){ne=!0;for(const a of Oe.filter(e=>!Ge[e]))if(!$.has(a))try{const e=await xe(a),t=document.querySelector(`[data-animal="${a}"] .model-preview`),i=ke||(ke=new fe({canvas:document.createElement("canvas"),alpha:!0,antialias:!0,preserveDrawingBuffer:!0}));i.setPixelRatio(Math.min(devicePixelRatio||1,1.5));const s=new pe,r=new he(36,1,.1,30),o=new me(e,L),c=o.update(ge(e,e.frames.length-1,1));s.add(o),Se(s);const h=new ze().setFromObject(o),y=h.getSize(new X).length();r.position.copy(c).add(new X(e.cuts?.6:a.startsWith("Dinosaur")?.55:.48,e.cuts?-.6:a.startsWith("Dinosaur")?.25:.3,1).normalize().multiplyScalar(Math.max(1,y*1.55)));const S=new ve(r,t);S.target.copy(c),S.enablePan=!1,S.enableZoom=!1,S.update();const w={renderer:i,scene:s,camera:r,paper:o,controls:S,canvas:t,context:t.getContext("2d"),dirty:!0};S.addEventListener("change",()=>w.dirty=!0),$.set(a,w),new ResizeObserver(()=>w.dirty=!0).observe(t)}catch(e){console.warn(`Preview unavailable: ${a}`,e),document.querySelector(`[data-animal="${a}"] canvas`).setAttribute("aria-label",`${a} preview unavailable. Click to select.`)}ne=!1}}document.addEventListener("panel-open",a=>{if(C=null,u=!1,m=!1,x=!1,b(),a.detail==="models"){Ft();for(const e of $.values())e.dirty=!0}});function je(a){const e=ie?Math.min((a-ie)/1e3,.05):0;if(ie=a,l&&!document.hidden){if(u&&!(C?.prepare&&p===0)){const t=l.motions?.[f],i=t?.type==="foundation"?l.foundation.motions[t.step]:t,s=i?.type==="cut"?12:i?.type==="panel-tree"||(i?.curve?.length||0)>1?7.2:5.6;p=Math.min(1,p+e*(x?3:F)/s),p===1&&(u=!1),P(),p===1&&(x||m)?Ee():b()}if(C){const t=C;t.elapsed=Math.min(1,t.elapsed+e/t.duration);const i=t.elapsed,s=i*i*i*(i*(i*6-15)+10),r=U.lerp(t.from.length(),t.to.length(),s),o=t.from.clone().normalize(),c=t.to.clone().normalize(),h=new _e().setFromUnitVectors(o,c),y=o.applyQuaternion(new _e().slerp(h,s)).multiplyScalar(r);g.position.copy(d.target).add(y),d.update(),_=!0,t.elapsed===1&&(C=null)}}if(E&&_&&(R.render(),_=!1),n("appDialog").open&&!n("panel-models").hidden){for(const t of $.values())if(t.dirty){const i=t.canvas.getBoundingClientRect();if(i.width&&i.height){t.renderer.setSize(i.width,i.height,!1),t.camera.aspect=i.width/i.height,t.camera.updateProjectionMatrix(),t.renderer.render(t.scene,t.camera);const s=t.renderer.domElement;(t.canvas.width!==s.width||t.canvas.height!==s.height)&&(t.canvas.width=s.width,t.canvas.height=s.height),t.context.clearRect(0,0,t.canvas.width,t.canvas.height),t.context.drawImage(s,0,0),t.dirty=!1}}}requestAnimationFrame(je)}Rt();J();b();be(Ie);requestAnimationFrame(je);if(document.modelContext?.registerTool)try{Promise.resolve(document.modelContext.registerTool({name:"show_origami_step",description:"Show a paused folding step for the currently selected animal.",inputSchema:{type:"object",properties:{step:{type:"integer",minimum:1},progress:{type:"number",minimum:0,maximum:1}},required:["step","progress"],additionalProperties:!1},annotations:{readOnlyHint:!1},execute(a){if(!l||!a||!Number.isInteger(a.step)||a.step<1||a.step>l.frames.length||!Number.isFinite(a.progress)||a.progress<0||a.progress>1)throw Error("Invalid step or progress");return f=a.step-1,p=a.progress,u=!1,m=!1,x=!1,P(),b(),{step:f+1,progress:p,playing:u}}})).catch(console.error)}catch(a){console.error(a)}
