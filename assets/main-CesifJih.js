import{M as ht,O as mt,B as gt,F as je,S as Qe,U as tt,V as be,W as vt,H as xt,N as St,C as bt,a as De,R as wt,b as yt,c as Et,L as Ct,d as Dt,e as _t,A as Mt,f as Pt,g as At,h as Lt,m as we,i as _e,j as Me,P as Pe,k as Ae,s as K,l as at,n as re,o as Le,p as Y,Q as We,v as Tt,q as kt,D as Ve,r as Rt}from"./patterns-zwrVWLYj.js";const zt={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class ee{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Nt=new mt(-1,1,1,-1,0,1);class Ft extends gt{constructor(){super(),this.setAttribute("position",new je([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new je([0,2,0,0,2,0],2))}}const Bt=new Ft;class it{constructor(e){this._mesh=new ht(Bt,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Nt)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class st extends ee{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Qe?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=tt.clone(e.uniforms),this.material=new Qe({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new it(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Xe extends ee{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,c;this.inverse?(o=0,c=1):(o=1,c=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(c),r.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class Ot extends ee{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class Gt{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new be);this._width=i.width,this._height=i.height,t=new vt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:xt}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new st(zt),this.copyPass.material.blending=St,this.clock=new bt}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let s=0,r=this.passes.length;s<r;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),o.needsSwap){if(i){const c=this.renderer.getContext(),m=this.renderer.state.buffers.stencil;m.setFunc(c.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),m.setFunc(c.EQUAL,1,4294967295)}this.swapBuffers()}Xe!==void 0&&(o instanceof Xe?i=!0:o instanceof Ot&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new be);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class It extends ee{constructor(e,t,i=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new De}render(e,t,i){const s=e.autoClear;e.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=s}}const Ut={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new be(1/1024,1/512)}},vertexShader:`

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

		}`},ae={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class $t extends ee{constructor(){super(),this.uniforms=tt.clone(ae.uniforms),this.material=new wt({name:ae.name,uniforms:this.uniforms,vertexShader:ae.vertexShader,fragmentShader:ae.fragmentShader}),this._fsQuad=new it(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},yt.getTransfer(this._outputColorSpace)===Et&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Ct?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Dt?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===_t?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Mt?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Pt?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===At?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Lt&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const Te=["Frog","Crane","Whale","Butterfly"],nt={},qt=[],O=a=>document.getElementById(a),R=O("appDialog");let ye;function se(){R.open&&R.close(),document.body.classList.remove("modal-open"),O("modalScrim").hidden=!0,document.querySelectorAll("#menu button").forEach(a=>{a.removeAttribute("aria-current")}),O("menu").style.setProperty("--active-tab",-1)}function rt(a){ye=document.activeElement,document.querySelectorAll(".panel-content>section").forEach(t=>t.hidden=t.id!==`panel-${a}`),O("panelTitle").textContent={color:"Paper color",paper:"Paper texture",models:"Origami library",thanks:"Thanks"}[a],document.body.classList.add("modal-open"),O("modalScrim").hidden=!1,R.open||R.showModal();const e={color:0,paper:1,models:2,thanks:3}[a];e!==void 0&&(O("menu").style.setProperty("--active-tab",e),document.querySelectorAll("#menu button").forEach((t,i)=>{t.toggleAttribute("aria-current",i===e)})),document.dispatchEvent(new CustomEvent("panel-open",{detail:a}))}function Ht(){document.querySelectorAll("[data-panel]").forEach(a=>a.addEventListener("click",()=>rt(a.dataset.panel))),O("closePanel").onclick=se,R.addEventListener("close",()=>{se(),ye?.isConnected&&ye.focus()}),R.addEventListener("click",a=>{if(a.target!==R)return;const e=R.getBoundingClientRect();(a.clientX<e.left||a.clientX>e.right||a.clientY<e.top||a.clientY>e.bottom)&&se()})}const n=a=>document.getElementById(a),Ee=a=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${a}</svg>`,me={play:Ee('<path d="m8 5 11 7-11 7z"/>'),pause:Ee('<path d="M8 5v14M16 5v14"/>')},Ye=new URLSearchParams(document.location?.search||"").get("animal"),ot=Te.includes(Ye)?Ye:"Crane";let ce=ot,l,p=0,f=0,u=!1,h=!1,E=!1,W=1,ge=0,j="#087b96",V="#ffffff",oe="solid",B=we(oe,j),Ke=null,A=null,_,Q,v,d,x,H,L=!0,ve=0;const ie=new Map,Z=new Map;Ht();function ke(a,e=!1){a.add(new kt(16777215,7899549,1.5));const t=new Ve(16774887,2.5);t.position.set(-3.5,4,5),t.castShadow=e,e&&(t.shadow.mapSize.set(2048,2048),Object.assign(t.shadow.camera,{left:-3,right:3,top:3,bottom:-3,near:.1,far:20}),t.shadow.intensity=.12,t.shadow.bias=-3e-4,t.shadow.normalBias=.008),a.add(t);const i=new Ve(13031926,.95);i.position.set(3,-1,-5),a.add(i)}function jt(){_=new _e({canvas:n("paper"),antialias:!0}),_.setPixelRatio(Math.min(devicePixelRatio||1,2)),_.shadowMap.enabled=!0,_.shadowMap.autoUpdate=!1,_.shadowMap.needsUpdate=!0,_.shadowMap.type=Rt,Q=new Me,Q.background=new De("#ffffff"),v=new Pe(36,1,.1,30),v.position.set(.5,3.2,4.2),d=new Le(v,n("paper")),d.enablePan=!1,d.zoomToCursor=!1,d.minDistance=1.5,d.maxDistance=12,d.maxPolarAngle=Math.PI*.55,d.minPolarAngle=Math.PI*.15,d.addEventListener("change",()=>L=!0),d.addEventListener("start",()=>{A=null}),ke(Q,!1),H=new Gt(_),H.addPass(new It(Q,v)),H.addPass(new $t);const a=new st(Ut);H.addPass(a);const e=()=>{const t=n("paper").getBoundingClientRect();if(!t.width||!t.height)return;_.setSize(t.width,t.height,!1),v.aspect=t.width/t.height,v.updateProjectionMatrix(),H.setSize(t.width,t.height);const i=_.getPixelRatio();a.uniforms.resolution.value.set(1/(t.width*i),1/(t.height*i)),L=!0};new ResizeObserver(e).observe(n("paper")),e(),n("paper").addEventListener("webglcontextlost",t=>{t.preventDefault(),u=!1,h=!1,E=!1,X("3D view interrupted","Reload this page to restore the graphics view.")})}async function Re(a){if(ie.has(a))return ie.get(a);const e=(async()=>{const t=await fetch(a==="Crane"?"./crane-motion.json":`./models/${a.toLowerCase()}.json`);if(!t.ok)throw Error("Model unavailable");const i=await t.json();if(Tt(i,a),i.complete!==!0)throw Error("Folding lesson is incomplete");return i})();ie.set(a,e);try{return await e}catch(t){throw ie.delete(a),t}}function X(a,e,t){n("modelMessage").hidden=!1,n("messageTitle").textContent=a,n("messageText").textContent=e,n("referenceLink").hidden=!0,n("playback").hidden=!0,n("stepPillWrap").hidden=!0,Ne(!1)}function Qt(){A=null,x&&(Q.remove(x),x.dispose(),x=null),l=null,u=!1,h=!1,E=!1,n("steps").replaceChildren(),L=!0}async function ze(a,e="default"){const t=++ge;if(Ke?.(),Ke=null,n("appSurface").style.minHeight="",n("videoLesson").hidden=!0,n("paper").hidden=!1,n("viewControls").hidden=!1,n("front").hidden=!1,n("back").hidden=!1,n("spatial").hidden=!1,n("menuColor").disabled=!1,n("menuPaper").disabled=!1,n("retry").hidden=!0,ce=a,document.title=a?`${a} — Origami`:"Origami",dt(),_&&Qt(),!a){n("paper").setAttribute("aria-label","Origami workspace"),X("Choose a model","Select a tutorial from Models to begin.");return}if(nt[a]){n("viewControls").hidden=!0,X(a,"The native 3D folding sequence is not ready yet. This animal cannot currently be folded in the app.");return}X("Loading…","");try{const i=await Re(a);if(t!==ge)return;_||jt(),l=i,p=0,f=0,u=!1,h=!1,E=!1,x=new Ae(l,B,{backColor:V}),x.rotation.set(Math.PI,Math.PI,0),Q.add(x),d.target.set(0,0,0),de("front",5.2),n("modelMessage").hidden=!0,n("playback").hidden=!1,n("stepPillWrap").hidden=!1,Kt(),k(),C()}catch(i){if(t!==ge)return;console.error(i),X("Unable to show the 3D model",/WebGL|context/i.test(i.message)?"3D graphics are unavailable in this browser. Try a browser with graphics acceleration enabled.":"The model could not load. Please try again."),n("retry").hidden=!1,n("retry").onclick=()=>{n("retry").hidden=!0,ze(a)}}}function Wt(){return l.surfaceMarks&&p===l.frames.length-1&&f===1?[]:[...new Set(l.activeEdges.slice(0,p+(f>=1?1:0)).flat())]}function Vt(){if(!x||!v||!d||!l||!x.geometry.boundingSphere)return;x.updateMatrixWorld();const a=x.geometry.boundingSphere,e=d.target,i=a.center.clone().applyMatrix4(x.matrixWorld).distanceTo(e)+a.radius,s=Math.tan(Y.degToRad(v.fov/2)),r=Math.min(s,s*v.aspect);if(!(r>0))return;const o=Y.clamp(i/r*1.12,d.minDistance,d.maxDistance),c=v.position.distanceTo(e);if(c<o-1e-6){const m=v.position.clone().sub(e).normalize();v.position.copy(e).addScaledVector(m,Y.lerp(c,o,.25)),d.update(),L=!0}}function k(){!x||!l||(x.update(K(l,p,f),Wt(),f<1?l.activeEdges[p]:[]),Vt(),Xt(),_.shadowMap.needsUpdate=!0,L=!0)}let Ze=-1,Je=!1,xe=null;function Xt(){const a=n("creaseDiagram");if(!a)return;if(!l||!l.activeEdges){a.innerHTML="",a.style.visibility="hidden",xe=null;return}const e=f>=1;if(xe===l&&Ze===p&&Je===e)return;xe=l,Ze=p,Je=e;const t=e?p+1:p,i=new Set(l.activeEdges[t]||[]);if(!i.size){a.innerHTML="",a.style.visibility="hidden";return}const s=l.flat;let r=1e9,o=-1e9,c=1e9,m=-1e9;for(const b of s)r=Math.min(r,b[0]),o=Math.max(o,b[0]),c=Math.min(c,b[2]),m=Math.max(m,b[2]);const D=100,S=100,g=8,M=b=>g+(b-r)/(o-r||1)*(D-2*g),P=b=>g+(b-c)/(m-c||1)*(S-2*g),w=b=>b.toFixed(1);let z=`<defs><marker id="nxFoldArrow" viewBox="0 0 10 10" refX="7.5" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0.5,1 L9,5 L0.5,9 z" fill="#263544"/></marker></defs><rect width="${D}" height="${S}" fill="#ffffff"/>`;for(const b of i){const[N,F]=l.edges[b];z+=`<line x1="${w(M(s[N][0]))}" y1="${w(P(s[N][2]))}" x2="${w(M(s[F][0]))}" y2="${w(P(s[F][2]))}" class="crease next"/>`}z+=Yt(l,t,s,M,P),a.setAttribute("viewBox",`0 0 ${D} ${S}`),a.innerHTML=z,a.style.visibility="visible"}function Yt(a,e,t,i,s){try{if(e<0||e>=a.frames.length)return"";const r=K(a,e,0),o=K(a,e,.5);if(!r||!o||r.length!==o.length||!r.length)return"";let c=0;const m=new Array(r.length);for(let y=0;y<r.length;y++){const U=r[y],$=o[y],q=Math.hypot($[0]-U[0],$[1]-U[1],$[2]-U[2]);m[y]=q,q>c&&(c=q)}if(!(c>1e-9))return"";let D=0,S=0,g=0;for(let y=0;y<m.length;y++)m[y]>c*.25&&(D+=t[y][0],S+=t[y][2],g++);if(g<3||g>=m.length)return"";D/=g,S/=g;let M=0,P=0,w=0,z=0,b=-1;for(const y of new Set(a.activeEdges[e]||[])){const[U,$]=a.edges[y],q=i(t[U][0]),Ue=s(t[U][2]),$e=i(t[$][0]),qe=s(t[$][2]),He=Math.hypot($e-q,qe-Ue);He>b&&(b=He,M=q,P=Ue,w=$e,z=qe)}if(!(b>4))return"";const N=(M+w)/2,F=(P+z)/2,fe=w-M,pe=z-P,he=Math.hypot(fe,pe)||1,ft=i(D),pt=s(S),Be=fe*(pt-P)-pe*(ft-M);if(Math.abs(Be)/he<10)return"";const Oe=Be>0?1:-1,G=-pe/he*Oe,I=fe/he*Oe;let T=1e9;if(G>1e-9?T=Math.min(T,(94-N)/G):G<-1e-9&&(T=Math.min(T,(N-6)/-G)),I>1e-9?T=Math.min(T,(94-F)/I):I<-1e-9&&(T=Math.min(T,(F-6)/-I)),!(T>16))return"";const Ge=Math.min(30,T),Ie=8,te=y=>y.toFixed(1);return`<line x1="${te(N+G*Ge)}" y1="${te(F+I*Ge)}" x2="${te(N-G*Ie)}" y2="${te(F-I*Ie)}" class="fold-arrow" marker-end="url(#nxFoldArrow)"/>`}catch{return""}}function Kt(){const a=l.titles||qt;n("steps").replaceChildren(...a.map((e,t)=>{const i=document.createElement("button");i.className="step",i.dataset.step=t,i.setAttribute("role","option");const s=document.createElement("span");s.className="number",s.textContent=t+1;const r=document.createElement("span");return r.textContent=e,i.append(s,r),i.onclick=()=>{p=t,f=0,u=!1,h=!1,E=!1,k(),C(),Ne(!1)},i}))}function Ne(a){const e=n("stepDropdown"),t=n("stepCounter"),i=n("stepPillArrow");if(!e)return;const s=a??e.hidden;e.hidden=!s,t.setAttribute("aria-expanded",String(s)),i.textContent=s?"✕":"▾",s&&e.querySelector("[aria-current]")?.scrollIntoView({block:"nearest"})}function C(){n("speed").textContent=`${W}×`,n("speed").setAttribute("aria-label",`Playback speed ${W} times. Change to ${W%3+1} times`);const a=l?.frames.length||0;n("stepPillText").textContent=l?`Step ${p+1}`:`${ce||"Origami"}`,n("play").innerHTML=u&&!h?me.pause:me.play,n("play").setAttribute("aria-label",u&&!h?"Pause step":f===1?"Replay step":"Play step"),n("play").title=n("play").getAttribute?.("aria-label")||"Play step",n("play").setAttribute("aria-pressed",String(u&&!h)),n("playAll").innerHTML=u&&h?me.pause:Ee('<path d="M5 12h14m-6-6 6 6-6 6"/>'),n("playAll").setAttribute("aria-label",u&&h?"Pause continuous playback":"Play all remaining steps"),n("playAll").title=u&&h?"Pause all":"Play all",n("playAll").setAttribute("aria-pressed",String(u&&h)),n("progress").value=Math.round(f*1e3),n("progress").style.setProperty("--fold-progress",`${f*100}%`),n("prev").disabled=!l||p===0,n("next").disabled=!l||p===a-1&&f===1,n("next").textContent=p===a-1?"Finish":"Next Step",document.querySelectorAll("#steps .step").forEach((e,t)=>{t===p?e.setAttribute("aria-current","step"):e.removeAttribute("aria-current")})}function Fe(){E=!1,p<l.frames.length-1?(p++,f=0,u=!0):(u=!1,h=!1),k(),C()}n("play").onclick=()=>{if(!l)return;const a=h;h=!1,f===1&&(f=0),u=a||!u,u||(E=!1),k(),C()};n("stepCounter").onclick=()=>{l&&Ne()};const le=matchMedia("(max-width:600px)");function lt(a){document.body.classList.toggle("mobile-layout",a),document.body.classList.toggle("force-desktop",!a&&le.matches),n("mobileToggle").setAttribute("aria-pressed",String(a))}let J=null;n("mobileToggle").onclick=()=>{J=!document.body.classList.contains("mobile-layout"),lt(J)};function ct(){J===null&&lt(le.matches)}le.addEventListener("change",()=>{ct(),J!==null&&document.body.classList.toggle("force-desktop",!J&&le.matches)});ct();n("speed").onclick=()=>{W=W%3+1,C()};n("playAll").onclick=()=>{if(l){if(u&&h){u=!1,h=!1,E=!1,C();return}if(h=!0,E=!1,f>=1){if(p<l.frames.length-1){Fe();return}p=0,f=0}u=!0,k(),C()}};n("prev").onclick=()=>{!l||p===0||(A=null,p--,f=1,u=!1,h=!1,E=!1,k(),C())};n("next").onclick=()=>{if(l){if(f>=1){Fe();return}E=!0,u=!0,C()}};n("progress").oninput=a=>{l&&(A=null,u=!1,h=!1,E=!1,f=Number(a.target.value)/1e3,k(),C())};const Zt=["front","back","spatial"];function de(a,e){if(!d)return;A=null;const t=d.target,i=e??v.position.distanceTo(t);v.up.set(0,1,0),a==="front"?v.position.set(t.x,t.y,t.z+i):a==="back"&&v.position.set(t.x,t.y,t.z-i),d.minPolarAngle=Math.PI*.15,d.maxPolarAngle=Math.PI*.55,d.enableRotate=a==="spatial",d.update();for(const s of Zt)n(s).setAttribute("aria-pressed",String(s===a));n("paper").setAttribute("aria-label",`${ce||"Origami"} origami model, ${a} view. `+(a==="spatial"?"Drag to rotate; pinch or scroll to zoom.":"Pinch or scroll to zoom.")),L=!0}n("front").onclick=()=>de("front");n("back").onclick=()=>de("back");n("spatial").onclick=()=>de("spatial");for(const[a,e]of[["zoomIn",1/1.2],["zoomOut",1.2]])n(a).onclick=()=>{if(!d||!l)return;A=null;const t=v.position.clone().sub(d.target),i=Y.clamp(t.length()*e,d.minDistance,d.maxDistance);v.position.copy(d.target).add(t.setLength(i)),d.update(),L=!0};function Jt(a){const e=new De(a);return .2126*e.r+.7152*e.g+.0722*e.b>.72&&e.multiplyScalar(.42),"#"+e.getHexString()}function ue(a=!1){const e=B;B=we(oe,j),x&&(x.setTexture(B),x.setBackColor(V));for(const i of Z.values())i.paper.setTexture(B),i.paper.setBackColor(V),i.dirty=!0;e.dispose();const t=Jt(j);document.documentElement.style.setProperty("--control-accent",t),a&&document.documentElement.style.setProperty("--accent",t),document.querySelectorAll("[data-color]").forEach(i=>i.setAttribute("aria-pressed",String(i.dataset.color===j))),document.querySelectorAll("[data-back]").forEach(i=>i.setAttribute("aria-pressed",String(i.dataset.back.toLowerCase()===V.toLowerCase()))),document.querySelectorAll("[data-pattern]").forEach(i=>{i.setAttribute("aria-pressed",String(i.dataset.pattern===oe));const s=we(i.dataset.pattern,j);i.querySelector(".pattern-preview").style.backgroundImage=`url(${s.image.toDataURL()})`,s.dispose()}),L=!0}function ea(){const a=n("backSwatches");if(!a||a.dataset.built)return;a.dataset.built="1";const e=new Set(["#ffffff"]);for(const t of document.querySelectorAll("[data-color]")){const i=t.dataset.color.toLowerCase();if(e.has(i))continue;e.add(i);const s=document.createElement("button");s.className="back-choice",s.dataset.back=t.dataset.color,s.setAttribute("aria-label",t.getAttribute("aria-label")),s.setAttribute("aria-pressed","false");const r=document.createElement("span");r.className="swatch-circle",r.style.background=t.dataset.color;const o=document.createElement("span");o.textContent=t.getAttribute("aria-label"),s.append(r,o),a.appendChild(s)}}document.querySelectorAll("[data-color]").forEach(a=>a.onclick=()=>{j=a.dataset.color,ue(!0)});document.querySelectorAll("[data-pattern]").forEach(a=>a.onclick=()=>{oe=a.dataset.pattern,ue()});ea();document.querySelectorAll("[data-back]").forEach(a=>a.onclick=()=>{V=a.dataset.back,ue()});function ta(){const a=n("modelGrid");a.innerHTML="";for(const e of Te){const t=document.createElement("button");t.className="model-item",t.dataset.animal=e,t.setAttribute("aria-label",`${e} — preview finished model`);const i=document.createElement("canvas");i.className="model-preview",i.setAttribute("aria-hidden","true");const s=document.createElement("span");s.className="model-name",s.textContent=e,t.append(i,s),t.onclick=()=>aa(e,t),a.append(t)}dt()}function dt(){document.querySelectorAll(".model-item").forEach(a=>{a.classList.toggle("selected",a.dataset.animal===ce)})}let ne=null;function aa(a,e){e.classList.add("pumping"),document.querySelectorAll(".model-item").forEach(t=>{t!==e&&t.classList.add("faded")}),setTimeout(()=>ia(a),380)}async function ia(a){const e=n("appDialog");document.querySelectorAll(".panel-content>section").forEach(i=>i.hidden=i.id!=="panel-preview"),n("panelTitle").textContent=a,e.classList.add("preview-open"),document.body.classList.add("modal-open"),n("modalScrim").hidden=!1,e.open||e.showModal(),n("previewStart").onclick=()=>{Ce(),se(),ze(a)},n("previewClose").onclick=()=>{Ce(),rt("models")};const t=n("previewBig");try{const i=await Re(a),s=new _e({canvas:t,alpha:!0,antialias:!0});s.setPixelRatio(Math.min(devicePixelRatio||1,2));const r=new Me,o=new Pe(36,1,.1,30),c=new Ae(i,B,{backColor:V}),m=c.update(K(i,i.frames.length-1,1));r.add(c),ke(r);const D=new at().setFromObject(c),S=D.getSize(new re).length();o.position.copy(m).add(new re(.5,.35,1).normalize().multiplyScalar(Math.max(1,S*1.6)));const g=new Le(o,t);g.target.copy(m),g.enablePan=!1,g.update();const M=()=>{const w=t.getBoundingClientRect();w.width&&w.height&&(s.setSize(w.width,w.height,!1),o.aspect=w.width/w.height,o.updateProjectionMatrix())};M(),new ResizeObserver(M).observe(t);const P=()=>{!e.open||n("panel-preview").hidden||(s.render(r,o),requestAnimationFrame(P))};P(),ne={renderer:s,scene:r,camera:o,paper:c,controls:g}}catch(i){console.warn("Big preview unavailable:",a,i)}}function Ce(){ne&&(ne.renderer.dispose(),ne=null),n("appDialog").classList.remove("preview-open"),document.querySelectorAll(".model-item").forEach(a=>a.classList.remove("pumping","faded"))}n("appDialog").addEventListener("close",()=>{Ce()});let Se=!1,et;async function sa(){if(!Se){Se=!0;for(const a of Te.filter(e=>!nt[e]))if(!Z.has(a))try{const e=await Re(a),t=document.querySelector(`[data-animal="${a}"] .model-preview`),i=et||(et=new _e({canvas:document.createElement("canvas"),alpha:!0,antialias:!0,preserveDrawingBuffer:!0}));i.setPixelRatio(Math.min(devicePixelRatio||1,1.5));const s=new Me,r=new Pe(36,1,.1,30),o=new Ae(e,B),c=o.update(K(e,e.frames.length-1,1));s.add(o),ke(s);const m=new at().setFromObject(o),D=m.getSize(new re).length();r.position.copy(c).add(new re(e.cuts?.6:a.startsWith("Dinosaur")?.55:.48,e.cuts?-.6:a.startsWith("Dinosaur")?.25:.3,1).normalize().multiplyScalar(Math.max(1,D*1.55)));const S=new Le(r,t);S.target.copy(c),S.enablePan=!1,S.enableZoom=!1,S.update();const g={renderer:i,scene:s,camera:r,paper:o,controls:S,canvas:t,context:t.getContext("2d"),dirty:!0};S.addEventListener("change",()=>g.dirty=!0),Z.set(a,g),new ResizeObserver(()=>g.dirty=!0).observe(t)}catch(e){console.warn(`Preview unavailable: ${a}`,e),document.querySelector(`[data-animal="${a}"] canvas`).setAttribute("aria-label",`${a} preview unavailable. Click to select.`)}Se=!1}}document.addEventListener("panel-open",a=>{if(A=null,u=!1,h=!1,E=!1,C(),a.detail==="models"){sa();for(const e of Z.values())e.dirty=!0}});function ut(a){const e=ve?Math.min((a-ve)/1e3,.05):0;if(ve=a,l&&!document.hidden){if(u&&!(A?.prepare&&f===0)){const t=l.motions?.[p],i=t?.type==="foundation"?l.foundation.motions[t.step]:t,s=i?.type==="cut"?12:i?.type==="panel-tree"||(i?.curve?.length||0)>1?7.2:5.6;f=Math.min(1,f+e*(E?3:W)/s),f===1&&(u=!1),k(),f===1&&(E||h)?Fe():C()}if(A){const t=A;t.elapsed=Math.min(1,t.elapsed+e/t.duration);const i=t.elapsed,s=i*i*i*(i*(i*6-15)+10),r=Y.lerp(t.from.length(),t.to.length(),s),o=t.from.clone().normalize(),c=t.to.clone().normalize(),m=new We().setFromUnitVectors(o,c),D=o.applyQuaternion(new We().slerp(m,s)).multiplyScalar(r);v.position.copy(d.target).add(D),d.update(),L=!0,t.elapsed===1&&(A=null)}}if(_&&L&&(H.render(),L=!1),n("appDialog").open&&!n("panel-models").hidden){for(const t of Z.values())if(t.dirty){const i=t.canvas.getBoundingClientRect();if(i.width&&i.height){t.renderer.setSize(i.width,i.height,!1),t.camera.aspect=i.width/i.height,t.camera.updateProjectionMatrix(),t.renderer.render(t.scene,t.camera);const s=t.renderer.domElement;(t.canvas.width!==s.width||t.canvas.height!==s.height)&&(t.canvas.width=s.width,t.canvas.height=s.height),t.context.clearRect(0,0,t.canvas.width,t.canvas.height),t.context.drawImage(s,0,0),t.dirty=!1}}}requestAnimationFrame(ut)}ta();ue();C();ze(ot);requestAnimationFrame(ut);if(document.modelContext?.registerTool)try{Promise.resolve(document.modelContext.registerTool({name:"show_origami_step",description:"Show a paused folding step for the currently selected animal.",inputSchema:{type:"object",properties:{step:{type:"integer",minimum:1},progress:{type:"number",minimum:0,maximum:1}},required:["step","progress"],additionalProperties:!1},annotations:{readOnlyHint:!1},execute(a){if(!l||!a||!Number.isInteger(a.step)||a.step<1||a.step>l.frames.length||!Number.isFinite(a.progress)||a.progress<0||a.progress>1)throw Error("Invalid step or progress");return p=a.step-1,f=a.progress,u=!1,h=!1,E=!1,k(),C(),{step:p+1,progress:f,playing:u}}})).catch(console.error)}catch(a){console.error(a)}
