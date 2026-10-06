import{M as Ie,O as Ue,B as $e,F as me,S as ge,U as De,V as ie,W as qe,H as He,N as Qe,C as je,a as le,R as We,b as Xe,c as Ve,L as Ye,d as Ke,e as Ze,A as Je,f as et,g as tt,h as at,m as ne,i as Me,j as Ae,P as Pe,k as Le,s as Te,l as st,n as ve,o as ke,p as G,Q as Se,v as it,q as nt,D as xe,r as rt}from"./patterns-Bs2-ghpM.js";const lt={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class q{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const ot=new Ue(-1,1,1,-1,0,1);class ct extends $e{constructor(){super(),this.setAttribute("position",new me([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new me([0,2,0,0,2,0],2))}}const dt=new ct;class Re{constructor(e){this._mesh=new Ie(dt,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,ot)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Ne extends q{constructor(e,a="tDiffuse"){super(),this.textureID=a,this.uniforms=null,this.material=null,e instanceof ge?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=De.clone(e.uniforms),this.material=new ge({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Re(this.material)}render(e,a,s){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=s.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(a),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class be extends q{constructor(e,a){super(),this.scene=e,this.camera=a,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,a,s){const i=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let l,p;this.inverse?(l=0,p=1):(l=1,p=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,l,4294967295),r.buffers.stencil.setClear(p),r.buffers.stencil.setLocked(!0),e.setRenderTarget(s),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(a),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),r.buffers.stencil.setLocked(!0)}}class ut extends q{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class ft{constructor(e,a){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),a===void 0){const s=e.getSize(new ie);this._width=s.width,this._height=s.height,a=new qe(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:He}),a.texture.name="EffectComposer.rt1"}else this._width=a.width,this._height=a.height;this.renderTarget1=a,this.renderTarget2=a.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Ne(lt),this.copyPass.material.blending=Qe,this.clock=new je}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,a){this.passes.splice(a,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const a=this.passes.indexOf(e);a!==-1&&this.passes.splice(a,1)}isLastEnabledPass(e){for(let a=e+1;a<this.passes.length;a++)if(this.passes[a].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const a=this.renderer.getRenderTarget();let s=!1;for(let i=0,r=this.passes.length;i<r;i++){const l=this.passes[i];if(l.enabled!==!1){if(l.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),l.render(this.renderer,this.writeBuffer,this.readBuffer,e,s),l.needsSwap){if(s){const p=this.renderer.getContext(),h=this.renderer.state.buffers.stencil;h.setFunc(p.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),h.setFunc(p.EQUAL,1,4294967295)}this.swapBuffers()}be!==void 0&&(l instanceof be?s=!0:l instanceof ut&&(s=!1))}}this.renderer.setRenderTarget(a)}reset(e){if(e===void 0){const a=this.renderer.getSize(new ie);this._pixelRatio=this.renderer.getPixelRatio(),this._width=a.width,this._height=a.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,a){this._width=e,this._height=a;const s=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(s,i),this.renderTarget2.setSize(s,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(s,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class pt extends q{constructor(e,a,s=null,i=null,r=null){super(),this.scene=e,this.camera=a,this.overrideMaterial=s,this.clearColor=i,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new le}render(e,a,s){const i=e.autoClear;e.autoClear=!1;let r,l;this.overrideMaterial!==null&&(l=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:s),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=l),e.autoClear=i}}const ht={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new ie(1/1024,1/512)}},vertexShader:`

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

		}`};class mt extends q{constructor(){super(),this.uniforms=De.clone(j.uniforms),this.material=new We({name:j.name,uniforms:this.uniforms,vertexShader:j.vertexShader,fragmentShader:j.fragmentShader}),this._fsQuad=new Re(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,a,s){this.uniforms.tDiffuse.value=s.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Xe.getTransfer(this._outputColorSpace)===Ve&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Ye?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Ke?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Ze?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Je?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===et?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===tt?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===at&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(a),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const $=[{number:1,title:"Classic",animals:["Crane"]},{number:2,title:"Whale",animals:["Whale"]}],oe=$.flatMap(t=>t.animals),ce={},gt=[],A=t=>document.getElementById(t),M=A("appDialog");let re;function I(){M.open&&M.close(),document.body.classList.remove("modal-open"),A("modalScrim").hidden=!0,document.querySelectorAll("#menu button").forEach(t=>{t.removeAttribute("aria-current")}),A("menu").style.setProperty("--active-tab",-1)}function vt(t){if(t==="fold"){I();return}re=document.activeElement,document.querySelectorAll(".panel-content>section").forEach(a=>a.hidden=a.id!==`panel-${t}`),A("panelTitle").textContent={steps:"Steps",color:"Paper color",paper:"Paper texture",models:"Origami library"}[t],document.body.classList.add("modal-open"),A("modalScrim").hidden=!1,M.open||M.showModal();const e={color:0,paper:1,models:2}[t];e!==void 0&&(A("menu").style.setProperty("--active-tab",e),document.querySelectorAll("#menu button").forEach((a,s)=>{a.toggleAttribute("aria-current",s===e)})),document.dispatchEvent(new CustomEvent("panel-open",{detail:t}))}function St(){document.querySelectorAll("[data-panel]").forEach(t=>t.addEventListener("click",()=>vt(t.dataset.panel))),A("closePanel").onclick=I,M.addEventListener("close",()=>{I(),re?.isConnected&&re.focus()}),M.addEventListener("click",t=>{if(t.target!==M)return;const e=M.getBoundingClientRect();(t.clientX<e.left||t.clientX>e.right||t.clientY<e.top||t.clientY>e.bottom)&&I()})}const n=t=>document.getElementById(t),X=t=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`,V={play:X('<path d="m8 5 11 7-11 7z"/>'),pause:X('<path d="M8 5v14M16 5v14"/>'),x:X('<path d="m6 6 12 12M18 6 6 18"/>')},we=new URLSearchParams(document.location?.search||"").get("animal"),de=oe.includes(we)?we:"Crane";let K=de,o,u=0,f=0,d=!1,m=!1,S=!1,F=1,ee=0,k="#087b96",U="#ffffff",Y="solid",R=ne(Y,k),Ee=null,w=null,b,N,g,c,v,T,E=!0,te=0;const W=new Map,O=new Map;St();function ze(t,e=!1){t.add(new nt(16777215,7899549,1.5));const a=new xe(16774887,2.5);a.position.set(-3.5,4,5),a.castShadow=e,e&&(a.shadow.mapSize.set(2048,2048),Object.assign(a.shadow.camera,{left:-3,right:3,top:3,bottom:-3,near:.1,far:20}),a.shadow.intensity=.12,a.shadow.bias=-3e-4,a.shadow.normalBias=.008),t.add(a);const s=new xe(13031926,.95);s.position.set(3,-1,-5),t.add(s)}function xt(){b=new Me({canvas:n("paper"),antialias:!0}),b.setPixelRatio(Math.min(devicePixelRatio||1,2)),b.shadowMap.enabled=!0,b.shadowMap.autoUpdate=!1,b.shadowMap.needsUpdate=!0,b.shadowMap.type=rt,N=new Ae,N.background=new le("#ffffff"),g=new Pe(36,1,.1,30),g.position.set(.5,3.2,4.2),c=new ke(g,n("paper")),c.enablePan=!1,c.zoomToCursor=!1,c.minDistance=1.5,c.maxDistance=12,c.maxPolarAngle=Math.PI*.55,c.minPolarAngle=Math.PI*.15,c.addEventListener("change",()=>E=!0),c.addEventListener("start",()=>{w=null}),ze(N,!1),T=new ft(b),T.addPass(new pt(N,g)),T.addPass(new mt);const t=new Ne(ht);T.addPass(t);const e=()=>{const a=n("paper").getBoundingClientRect();if(!a.width||!a.height)return;b.setSize(a.width,a.height,!1),g.aspect=a.width/a.height,g.updateProjectionMatrix(),T.setSize(a.width,a.height);const s=b.getPixelRatio();t.uniforms.resolution.value.set(1/(a.width*s),1/(a.height*s)),E=!0};new ResizeObserver(e).observe(n("paper")),e(),n("paper").addEventListener("webglcontextlost",a=>{a.preventDefault(),d=!1,m=!1,S=!1,B("3D view interrupted","Reload this page to restore the graphics view.")})}async function Fe(t){if(W.has(t))return W.get(t);const e=(async()=>{const a=await fetch(t==="Crane"?"./crane-motion.json":`./models/${t.toLowerCase()}.json`);if(!a.ok)throw Error("Model unavailable");const s=await a.json();if(it(s,t),s.complete!==!0)throw Error("Folding lesson is incomplete");return s})();W.set(t,e);try{return await e}catch(a){throw W.delete(t),a}}function B(t,e,a){n("modelMessage").hidden=!1,n("messageTitle").textContent=t,n("messageText").textContent=e,n("referenceLink").hidden=!0,n("playback").hidden=!0,n("stepCounter").hidden=!0}function bt(){w=null,v&&(N.remove(v),v.dispose(),v=null),o=null,d=!1,m=!1,S=!1,n("steps").replaceChildren(),E=!0}async function z(t,e="default"){const a=++ee;if(Ee?.(),Ee=null,n("appSurface").style.minHeight="",n("videoLesson").hidden=!0,n("paper").hidden=!1,n("viewControls").hidden=!1,n("front").hidden=!1,n("back").hidden=!1,n("spatial").hidden=!1,n("menuColor").disabled=!1,n("menuPaper").disabled=!1,n("retry").hidden=!0,K=t,document.title=t?`${t} — Origami`:"Origami",Oe(),b&&bt(),!t){n("paper").setAttribute("aria-label","Origami workspace"),B("Choose a model","Select a tutorial from Models to begin.");return}if(ce[t]){n("viewControls").hidden=!0,B(t,"The native 3D folding sequence is not ready yet. This animal cannot currently be folded in the app.");return}B("Loading…","");try{const s=await Fe(t);if(a!==ee)return;b||xt(),o=s,u=0,f=0,d=!1,m=!1,S=!1,v=new Le(o,R,{backColor:U}),v.rotation.set(Math.PI,Math.PI,0),N.add(v),c.target.set(0,0,0),Z("front",5.2),n("modelMessage").hidden=!0,n("playback").hidden=!1,n("stepCounter").hidden=!1,Ct(),_(),x()}catch(s){if(a!==ee)return;console.error(s),B("Unable to show the 3D model",/WebGL|context/i.test(s.message)?"3D graphics are unavailable in this browser. Try a browser with graphics acceleration enabled.":"The model could not load. Please try again."),n("retry").hidden=!1,n("retry").onclick=()=>{n("retry").hidden=!0,z(t)}}}function wt(){return o.surfaceMarks&&u===o.frames.length-1&&f===1?[]:[...new Set(o.activeEdges.slice(0,u+(f>=1?1:0)).flat())]}function Et(){if(!v||!g||!c||!o||!v.geometry.boundingSphere)return;v.updateMatrixWorld();const t=v.geometry.boundingSphere,e=c.target,s=t.center.clone().applyMatrix4(v.matrixWorld).distanceTo(e)+t.radius,i=Math.tan(G.degToRad(g.fov/2)),r=Math.min(i,i*g.aspect);if(!(r>0))return;const l=G.clamp(s/r*1.12,c.minDistance,c.maxDistance),p=g.position.distanceTo(e);if(p<l-1e-6){const h=g.position.clone().sub(e).normalize();g.position.copy(e).addScaledVector(h,G.lerp(p,l,.25)),c.update(),E=!0}}function _(){!v||!o||(v.update(Te(o,u,f),wt(),f<1?o.activeEdges[u]:[]),Et(),yt(),b.shadowMap.needsUpdate=!0,E=!0)}let ye=-1,ae=null;function yt(){const t=n("creaseDiagram");if(!t)return;if(!o||!o.activeEdges){t.innerHTML="",ae=null;return}if(ae===o&&ye===u)return;ae=o,ye=u;const e=new Set(o.activeEdges.flat());if(!e.size){t.innerHTML="";return}const a=new Set(o.activeEdges[u]||[]),s=new Set(o.activeEdges[u+1]||[]),i=o.flat;let r=1e9,l=-1e9,p=1e9,h=-1e9;for(const C of e){const[H,Q]=o.edges[C];for(const L of[H,Q])r=Math.min(r,i[L][0]),l=Math.max(l,i[L][0]),p=Math.min(p,i[L][2]),h=Math.max(h,i[L][2])}const P=100,y=100,D=8,fe=C=>(D+(C-r)/(l-r||1)*(P-2*D)).toFixed(1),pe=C=>(D+(C-p)/(h-p||1)*(y-2*D)).toFixed(1);let he="";for(const C of e){const[H,Q]=o.edges[C],L=a.has(C)?"crease active":s.has(C)?"crease next":"crease";he+=`<line x1="${fe(i[H][0])}" y1="${pe(i[H][2])}" x2="${fe(i[Q][0])}" y2="${pe(i[Q][2])}" class="${L}"/>`}t.setAttribute("viewBox",`0 0 ${P} ${y}`),t.innerHTML=he}function Ct(){const t=o.titles||gt;n("steps").replaceChildren(...t.map((e,a)=>{const s=document.createElement("button");s.className="step",s.dataset.step=a;const i=document.createElement("span");i.className="number",i.textContent=a+1;const r=document.createElement("span");return r.textContent=e,s.append(i,r),s.onclick=()=>{u=a,f=0,d=!1,m=!1,S=!1,_(),x(),I()},s}))}function x(){n("speed").textContent=`${F}×`,n("speed").setAttribute("aria-label",`Playback speed ${F} times. Change to ${F%3+1} times`);const t=o?.frames.length||0;n("stepCounter").textContent=`${K||"Origami"} – ${o?.motions?.[u]?.type==="cut"?"Cut":"Step"} ${u+1} / ${t}`,n("play").innerHTML=d&&!m?V.pause:V.play,n("play").setAttribute("aria-label",d&&!m?"Pause step":f===1?"Replay step":"Play step"),n("play").title=n("play").getAttribute?.("aria-label")||"Play step",n("play").setAttribute("aria-pressed",String(d&&!m)),n("playAll").innerHTML=d&&m?V.pause:X('<path d="M5 12h14m-6-6 6 6-6 6"/>'),n("playAll").setAttribute("aria-label",d&&m?"Pause continuous playback":"Play all remaining steps"),n("playAll").title=d&&m?"Pause all":"Play all",n("playAll").setAttribute("aria-pressed",String(d&&m)),n("progress").value=Math.round(f*1e3),n("progress").style.setProperty("--fold-progress",`${f*100}%`),n("prev").disabled=!o||u===0,n("next").disabled=!o||u===t-1&&f===1,n("next").textContent=u===t-1?"Finish":"Next Step",document.querySelectorAll("#steps .step").forEach((e,a)=>{a===u?e.setAttribute("aria-current","step"):e.removeAttribute("aria-current")})}function ue(){S=!1,u<o.frames.length-1?(u++,f=0,d=!0):(d=!1,m=!1),_(),x()}n("play").onclick=()=>{if(!o)return;const t=m;m=!1,f===1&&(f=0),d=t||!d,d||(S=!1),_(),x()};n("speed").onclick=()=>{F=F%3+1,x()};n("playAll").onclick=()=>{if(o){if(d&&m){d=!1,m=!1,S=!1,x();return}if(m=!0,S=!1,f>=1){if(u<o.frames.length-1){ue();return}u=0,f=0}d=!0,_(),x()}};n("prev").onclick=()=>{!o||u===0||(w=null,u--,f=1,d=!1,m=!1,S=!1,_(),x())};n("next").onclick=()=>{if(o){if(f>=1){ue();return}S=!0,d=!0,x()}};n("progress").oninput=t=>{o&&(w=null,d=!1,m=!1,S=!1,f=Number(t.target.value)/1e3,_(),x())};const _t=["front","back","spatial"];function Z(t,e){if(!c)return;w=null;const a=c.target,s=e??g.position.distanceTo(a);g.up.set(0,1,0),t==="front"?g.position.set(a.x,a.y,a.z+s):t==="back"&&g.position.set(a.x,a.y,a.z-s),c.minPolarAngle=Math.PI*.15,c.maxPolarAngle=Math.PI*.55,c.enableRotate=t==="spatial",c.update();for(const i of _t)n(i).setAttribute("aria-pressed",String(i===t));n("paper").setAttribute("aria-label",`${K||"Origami"} origami model, ${t} view. `+(t==="spatial"?"Drag to rotate; pinch or scroll to zoom.":"Pinch or scroll to zoom.")),E=!0}n("front").onclick=()=>Z("front");n("back").onclick=()=>Z("back");n("spatial").onclick=()=>Z("spatial");for(const[t,e]of[["zoomIn",1/1.2],["zoomOut",1.2]])n(t).onclick=()=>{if(!c||!o)return;w=null;const a=g.position.clone().sub(c.target),s=G.clamp(a.length()*e,c.minDistance,c.maxDistance);g.position.copy(c.target).add(a.setLength(s)),c.update(),E=!0};function Dt(t){const e=new le(t);return .2126*e.r+.7152*e.g+.0722*e.b>.72&&e.multiplyScalar(.42),"#"+e.getHexString()}function J(t=!1){const e=R;R=ne(Y,k),v&&(v.setTexture(R),v.setBackColor(U));for(const s of O.values())s.paper.setTexture(R),s.paper.setBackColor(U),s.dirty=!0;e.dispose();const a=Dt(k);document.documentElement.style.setProperty("--control-accent",a),t&&document.documentElement.style.setProperty("--accent",a),document.querySelectorAll("[data-color]").forEach(s=>s.setAttribute("aria-pressed",String(s.dataset.color===k))),document.querySelectorAll("[data-back]").forEach(s=>s.setAttribute("aria-pressed",String(s.dataset.back.toLowerCase()===U.toLowerCase()))),document.querySelectorAll("[data-pattern]").forEach(s=>{s.setAttribute("aria-pressed",String(s.dataset.pattern===Y));const i=ne(s.dataset.pattern,k);s.querySelector(".pattern-preview").style.backgroundImage=`url(${i.image.toDataURL()})`,i.dispose()}),E=!0}function Mt(){const t=n("backSwatches");if(!t||t.dataset.built)return;t.dataset.built="1";const e=new Set(["#ffffff"]);for(const a of document.querySelectorAll("[data-color]")){const s=a.dataset.color.toLowerCase();if(e.has(s))continue;e.add(s);const i=document.createElement("button");i.className="back-choice",i.dataset.back=a.dataset.color,i.setAttribute("aria-label",a.getAttribute("aria-label")),i.setAttribute("aria-pressed","false");const r=document.createElement("span");r.className="swatch-circle",r.style.background=a.dataset.color;const l=document.createElement("span");l.textContent=a.getAttribute("aria-label"),i.append(r,l),t.appendChild(i)}}document.querySelectorAll("[data-color]").forEach(t=>t.onclick=()=>{k=t.dataset.color,J(!0)});document.querySelectorAll("[data-pattern]").forEach(t=>t.onclick=()=>{Y=t.dataset.pattern,J()});Mt();document.querySelectorAll("[data-back]").forEach(t=>t.onclick=()=>{U=t.dataset.back,J()});function Oe(){document.querySelectorAll(".animal-card").forEach(t=>{const e=t.dataset.animal===K;t.classList.toggle("selected",e),t.querySelector(".animal-name").setAttribute("aria-pressed",String(e)),t.querySelector(".deselect").hidden=!e})}let Be=$.find(t=>t.animals.includes(de)).number;function Ce(t){const e=$.find(a=>a.number===t);if(e?.animals.length){Be=t,n("levelTitle").textContent=`Level ${t} — ${e.title}`,n("sourceCredit").textContent=t===1?"Crane: adapted from Origami Odyssey · Robb Doering.":"Whale: adapted from OrigamiOK whale tutorial.";for(const a of n("animals").children)a.hidden=Number(a.dataset.level)!==t;for(const a of n("levels").children)a.setAttribute("aria-pressed",String(Number(a.dataset.level)===t));for(const a of O.values())a.dirty=!0}}function At(){for(const t of $){const e=document.createElement("button");e.dataset.level=t.number,e.disabled=!t.animals.length,e.disabled&&(e.title="Lessons being rebuilt",e.setAttribute("aria-label",`Level ${t.number} — lessons being rebuilt`)),e.textContent=`Level ${t.number}`,e.onclick=()=>Ce(t.number),n("levels").append(e)}for(const t of oe){const e=$.find(r=>r.animals.includes(t)).number,a=document.createElement("article");a.className="animal-card",a.dataset.animal=t,a.dataset.level=e;const s=document.createElement("button");s.className="animal-name",s.textContent=t,t==="Turtle"&&(s.title="Simple turtle profile"),s.onclick=()=>z(t);const i=document.createElement("button");if(i.className="deselect",i.innerHTML=V.x,i.setAttribute("aria-label",`Deselect ${t}`),i.onclick=()=>z(null),ce[t]){const r=document.createElement("div");r.className="native-pending",r.textContent="3D in development",a.append(r)}else{const r=document.createElement("canvas");r.setAttribute("aria-label",`${t} finished model. Drag to rotate. Click to select.`),r.tabIndex=0;let l,p=!1;r.addEventListener("pointerdown",h=>{l=[h.clientX,h.clientY],p=!1}),r.addEventListener("pointermove",h=>{l&&Math.hypot(h.clientX-l[0],h.clientY-l[1])>5&&(p=!0)}),r.addEventListener("pointerup",()=>{l&&!p&&z(t,"study"),l=null}),r.addEventListener("pointercancel",()=>l=null),r.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),z(t,"study"))}),a.append(r)}if(a.append(s,i),t==="Dragonfly"){const r=document.createElement("span");r.className="lesson-badge",r.textContent="Cut & fold",a.append(r)}n("animals").append(a)}Oe(),Ce(Be)}let se=!1,_e;async function Pt(){if(!se){se=!0;for(const t of oe.filter(e=>!ce[e]))if(!O.has(t))try{const e=await Fe(t),a=document.querySelector(`[data-animal="${t}"] canvas`),s=_e||(_e=new Me({canvas:document.createElement("canvas"),alpha:!0,antialias:!0,preserveDrawingBuffer:!0}));s.setPixelRatio(Math.min(devicePixelRatio||1,1.5));const i=new Ae,r=new Pe(36,1,.1,30),l=new Le(e,R),p=l.update(Te(e,e.frames.length-1,1));i.add(l),ze(i);const h=new st().setFromObject(l),P=h.getSize(new ve).length();r.position.copy(p).add(new ve(e.cuts?.6:t.startsWith("Dinosaur")?.55:.48,e.cuts?-.6:t.startsWith("Dinosaur")?.25:.3,1).normalize().multiplyScalar(Math.max(1,P*1.55)));const y=new ke(r,a);y.target.copy(p),y.enablePan=!1,y.enableZoom=!1,y.update();const D={renderer:s,scene:i,camera:r,paper:l,controls:y,canvas:a,context:a.getContext("2d"),dirty:!0};y.addEventListener("change",()=>D.dirty=!0),O.set(t,D),new ResizeObserver(()=>D.dirty=!0).observe(a)}catch(e){console.warn(`Preview unavailable: ${t}`,e),document.querySelector(`[data-animal="${t}"] canvas`).setAttribute("aria-label",`${t} preview unavailable. Click to select.`)}se=!1}}document.addEventListener("panel-open",t=>{if(w=null,d=!1,m=!1,S=!1,x(),t.detail==="models"){Pt();for(const e of O.values())e.dirty=!0}});function Ge(t){const e=te?Math.min((t-te)/1e3,.05):0;if(te=t,o&&!document.hidden){if(d&&!(w?.prepare&&f===0)){const a=o.motions?.[u],s=a?.type==="foundation"?o.foundation.motions[a.step]:a,i=s?.type==="cut"?12:s?.type==="panel-tree"||(s?.curve?.length||0)>1?7.2:5.6;f=Math.min(1,f+e*(S?3:F)/i),f===1&&(d=!1),_(),f===1&&(S||m)?ue():x()}if(w){const a=w;a.elapsed=Math.min(1,a.elapsed+e/a.duration);const s=a.elapsed,i=s*s*s*(s*(s*6-15)+10),r=G.lerp(a.from.length(),a.to.length(),i),l=a.from.clone().normalize(),p=a.to.clone().normalize(),h=new Se().setFromUnitVectors(l,p),P=l.applyQuaternion(new Se().slerp(h,i)).multiplyScalar(r);g.position.copy(c.target).add(P),c.update(),E=!0,a.elapsed===1&&(w=null)}}if(b&&E&&(T.render(),E=!1),n("appDialog").open&&!n("panel-models").hidden){for(const a of O.values())if(a.dirty){const s=a.canvas.getBoundingClientRect();if(s.width&&s.height){a.renderer.setSize(s.width,s.height,!1),a.camera.aspect=s.width/s.height,a.camera.updateProjectionMatrix(),a.renderer.render(a.scene,a.camera);const i=a.renderer.domElement;(a.canvas.width!==i.width||a.canvas.height!==i.height)&&(a.canvas.width=i.width,a.canvas.height=i.height),a.context.clearRect(0,0,a.canvas.width,a.canvas.height),a.context.drawImage(i,0,0),a.dirty=!1}}}requestAnimationFrame(Ge)}At();J();x();z(de);requestAnimationFrame(Ge);if(document.modelContext?.registerTool)try{Promise.resolve(document.modelContext.registerTool({name:"show_origami_step",description:"Show a paused folding step for the currently selected animal.",inputSchema:{type:"object",properties:{step:{type:"integer",minimum:1},progress:{type:"number",minimum:0,maximum:1}},required:["step","progress"],additionalProperties:!1},annotations:{readOnlyHint:!1},execute(t){if(!o||!t||!Number.isInteger(t.step)||t.step<1||t.step>o.frames.length||!Number.isFinite(t.progress)||t.progress<0||t.progress>1)throw Error("Invalid step or progress");return u=t.step-1,f=t.progress,d=!1,m=!1,S=!1,_(),x(),{step:u+1,progress:f,playing:d}}})).catch(console.error)}catch(t){console.error(t)}
