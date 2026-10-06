import{M as $e,O as je,B as Qe,F as Ce,S as De,U as ke,V as ne,W as We,H as Ve,N as Xe,C as Ke,a as pe,R as Ye,b as Ze,c as Je,L as et,d as tt,e as at,A as it,f as st,g as nt,h as rt,m as re,i as fe,j as he,P as me,k as ge,s as Y,l as ze,n as T,o as ve,p as G,Q as Pe,v as ot,q as lt,D as Me,r as ct}from"./patterns-BShnR4Ym.js";const dt={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class q{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const ut=new je(-1,1,1,-1,0,1);class pt extends Qe{constructor(){super(),this.setAttribute("position",new Ce([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ce([0,2,0,0,2,0],2))}}const ft=new pt;class Ne{constructor(e){this._mesh=new $e(ft,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,ut)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Fe extends q{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof De?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=ke.clone(e.uniforms),this.material=new De({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Ne(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Ae extends q{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const n=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,h;this.inverse?(o=0,h=1):(o=1,h=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(n.REPLACE,n.REPLACE,n.REPLACE),r.buffers.stencil.setFunc(n.ALWAYS,o,4294967295),r.buffers.stencil.setClear(h),r.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(n.EQUAL,1,4294967295),r.buffers.stencil.setOp(n.KEEP,n.KEEP,n.KEEP),r.buffers.stencil.setLocked(!0)}}class ht extends q{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class mt{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new ne);this._width=i.width,this._height=i.height,t=new We(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Ve}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Fe(dt),this.copyPass.material.blending=Xe,this.clock=new Ke}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let n=0,r=this.passes.length;n<r;n++){const o=this.passes[n];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(n),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),o.needsSwap){if(i){const h=this.renderer.getContext(),w=this.renderer.state.buffers.stencil;w.setFunc(h.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),w.setFunc(h.EQUAL,1,4294967295)}this.swapBuffers()}Ae!==void 0&&(o instanceof Ae?i=!0:o instanceof ht&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new ne);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,n=this._height*this._pixelRatio;this.renderTarget1.setSize(i,n),this.renderTarget2.setSize(i,n);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,n)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class gt extends q{constructor(e,t,i=null,n=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=n,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new pe}render(e,t,i){const n=e.autoClear;e.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=n}}const vt={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new ne(1/1024,1/512)}},vertexShader:`

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

		}`};class St extends q{constructor(){super(),this.uniforms=ke.clone(H.uniforms),this.material=new Ye({name:H.name,uniforms:this.uniforms,vertexShader:H.vertexShader,fragmentShader:H.fragmentShader}),this._fsQuad=new Ne(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Ze.getTransfer(this._outputColorSpace)===Je&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===et?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===tt?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===at?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===it?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===st?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===nt?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===rt&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const Se=["Frog","Crane","Whale","Butterfly"],Oe={},xt=[],L=a=>document.getElementById(a),M=L("appDialog");let oe;function Q(){M.open&&M.close(),document.body.classList.remove("modal-open"),L("modalScrim").hidden=!0,document.querySelectorAll("#menu button").forEach(a=>{a.removeAttribute("aria-current")}),L("menu").style.setProperty("--active-tab",-1)}function Be(a){oe=document.activeElement,document.querySelectorAll(".panel-content>section").forEach(t=>t.hidden=t.id!==`panel-${a}`),L("panelTitle").textContent={color:"Paper color",paper:"Paper texture",models:"Origami library",thanks:"Thanks"}[a],document.body.classList.add("modal-open"),L("modalScrim").hidden=!1,M.open||M.showModal();const e={color:0,paper:1,models:2,thanks:3}[a];e!==void 0&&(L("menu").style.setProperty("--active-tab",e),document.querySelectorAll("#menu button").forEach((t,i)=>{t.toggleAttribute("aria-current",i===e)})),document.dispatchEvent(new CustomEvent("panel-open",{detail:a}))}function wt(){document.querySelectorAll("[data-panel]").forEach(a=>a.addEventListener("click",()=>Be(a.dataset.panel))),L("closePanel").onclick=Q,M.addEventListener("close",()=>{Q(),oe?.isConnected&&oe.focus()}),M.addEventListener("click",a=>{if(a.target!==M)return;const e=M.getBoundingClientRect();(a.clientX<e.left||a.clientX>e.right||a.clientY<e.top||a.clientY>e.bottom)&&Q()})}const s=a=>document.getElementById(a),le=a=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${a}</svg>`,te={play:le('<path d="m8 5 11 7-11 7z"/>'),pause:le('<path d="M8 5v14M16 5v14"/>')},Le=new URLSearchParams(document.location?.search||"").get("animal"),Ge=Se.includes(Le)?Le:"Crane";let Z=Ge,d,f=0,p=0,u=!1,m=!1,S=!1,N=1,ae=0,k="#087b96",V="solid",A=re(V,k),Te=null,_=null,y,z,g,c,v,R,E=!0,ie=0;const $=new Map,I=new Map;wt();function xe(a,e=!1){a.add(new lt(16777215,7899549,1.5));const t=new Me(16774887,2.5);t.position.set(-3.5,4,5),t.castShadow=e,e&&(t.shadow.mapSize.set(2048,2048),Object.assign(t.shadow.camera,{left:-3,right:3,top:3,bottom:-3,near:.1,far:20}),t.shadow.intensity=.12,t.shadow.bias=-3e-4,t.shadow.normalBias=.008),a.add(t);const i=new Me(13031926,.95);i.position.set(3,-1,-5),a.add(i)}function bt(){y=new fe({canvas:s("paper"),antialias:!0}),y.setPixelRatio(Math.min(devicePixelRatio||1,2)),y.shadowMap.enabled=!0,y.shadowMap.autoUpdate=!1,y.shadowMap.needsUpdate=!0,y.shadowMap.type=ct,z=new he,z.background=new pe("#ffffff"),g=new me(36,1,.1,30),g.position.set(.5,3.2,4.2),c=new ve(g,s("paper")),c.enablePan=!1,c.zoomToCursor=!1,c.minDistance=1.5,c.maxDistance=12,c.maxPolarAngle=Math.PI*.55,c.minPolarAngle=Math.PI*.15,c.addEventListener("change",()=>E=!0),c.addEventListener("start",()=>{_=null}),xe(z,!1),R=new mt(y),R.addPass(new gt(z,g)),R.addPass(new St);const a=new Fe(vt);R.addPass(a);const e=()=>{const t=s("paper").getBoundingClientRect();if(!t.width||!t.height)return;y.setSize(t.width,t.height,!1),g.aspect=t.width/t.height,g.updateProjectionMatrix(),R.setSize(t.width,t.height);const i=y.getPixelRatio();a.uniforms.resolution.value.set(1/(t.width*i),1/(t.height*i)),E=!0};new ResizeObserver(e).observe(s("paper")),e(),s("paper").addEventListener("webglcontextlost",t=>{t.preventDefault(),u=!1,m=!1,S=!1,B("3D view interrupted","Reload this page to restore the graphics view.")})}async function we(a){if($.has(a))return $.get(a);const e=(async()=>{const t=await fetch(a==="Crane"?"./crane-motion.json":`./models/${a.toLowerCase()}.json`);if(!t.ok)throw Error("Model unavailable");const i=await t.json();if(ot(i,a),i.complete!==!0)throw Error("Folding lesson is incomplete");return i})();$.set(a,e);try{return await e}catch(t){throw $.delete(a),t}}function B(a,e,t){s("modelMessage").hidden=!1,s("messageTitle").textContent=a,s("messageText").textContent=e,s("referenceLink").hidden=!0,s("playback").hidden=!0,s("stepPillWrap").hidden=!0,ye(!1)}function yt(){_=null,ce=-1,de=null,X=null,v&&(z.remove(v),v.dispose(),v=null),d=null,u=!1,m=!1,S=!1,s("steps").replaceChildren(),E=!0}async function be(a,e="default"){const t=++ae;if(Te?.(),Te=null,s("appSurface").style.minHeight="",s("videoLesson").hidden=!0,s("paper").hidden=!1,s("viewControls").hidden=!1,s("front").hidden=!1,s("back").hidden=!1,s("spatial").hidden=!1,s("menuColor").disabled=!1,s("menuPaper").disabled=!1,s("retry").hidden=!0,Z=a,document.title=a?`${a} — Origami`:"Origami",qe(),y&&yt(),!a){s("paper").setAttribute("aria-label","Origami workspace"),B("Choose a model","Select a tutorial from Models to begin.");return}if(Oe[a]){s("viewControls").hidden=!0,B(a,"The native 3D folding sequence is not ready yet. This animal cannot currently be folded in the app.");return}B("Loading…","");try{const i=await we(a);if(t!==ae)return;y||bt(),d=i,f=0,p=0,u=!1,m=!1,S=!1,v=new ge(d,A),v.rotation.set(Math.PI,Math.PI,0),z.add(v),c.target.set(0,0,0),J("front",2),s("modelMessage").hidden=!0,s("playback").hidden=!1,s("stepPillWrap").hidden=!1,Pt(),P(),x()}catch(i){if(t!==ae)return;console.error(i),B("Unable to show the 3D model",/WebGL|context/i.test(i.message)?"3D graphics are unavailable in this browser. Try a browser with graphics acceleration enabled.":"The model could not load. Please try again."),s("retry").hidden=!1,s("retry").onclick=()=>{s("retry").hidden=!0,be(a)}}}function Et(){return d.surfaceMarks&&f===d.frames.length-1&&p===1?[]:[...new Set(d.activeEdges.slice(0,f+(p>=1?1:0)).flat())]}let ce=-1,de=null,X=null;const j=new T;function _t(a){if(!X||!g||!c||!d)return;const e=1-Math.exp(-a*5);j.copy(X).sub(c.target).multiplyScalar(e),!(j.lengthSq()<1e-12)&&(c.target.add(j),g.position.add(j),c.update(),E=!0)}function Ct(){if(!v||!g||!c||!d||!v.geometry.boundingSphere)return;const a=v.geometry.boundingSphere,e=c.target,t=a.radius,i=Math.tan(G.degToRad(g.fov/2)),n=Math.min(i,i*g.aspect);if(!(n>0))return;const r=G.clamp(t/n*1.03,c.minDistance,c.maxDistance),o=g.position.distanceTo(e);if(o<r-1e-6){const h=g.position.clone().sub(e).normalize();g.position.copy(e).addScaledVector(h,G.lerp(o,r,.25)),c.update(),E=!0}}function Dt(a){ce!==f&&(ce=f,de=Y(d,f,0));const e=de;if(!e||e.length!==a.length||p<=0||p>=1)return null;const t=a.length,i=new Array(t),n=new Array(t),r=new Array(t);let o=0,h=0,w=0;for(let l=0;l<t;l++)i[l]=a[l][0]-e[l][0],n[l]=a[l][1]-e[l][1],r[l]=a[l][2]-e[l][2],o+=i[l],h+=n[l],w+=r[l];o/=t,h/=t,w/=t;const C=new Array(t);let b=0;for(let l=0;l<t;l++){const F=i[l]-o,O=n[l]-h,D=r[l]-w,ee=Math.sqrt(F*F+O*O+D*D);C[l]=ee,ee>b&&(b=ee)}if(b<1e-9)return null;for(let l=0;l<t;l++)C[l]=Math.min(1,C[l]/b);return C}function P(){if(!v||!d)return;const a=Y(d,f,p);v.updateMatrixWorld(!0);const e=new T;for(const t of a)e.add(new T(t[0],t[1],t[2]));X=e.multiplyScalar(1/Math.max(1,a.length)).applyMatrix4(v.matrixWorld),v.update(a,Et(),p<1?d.activeEdges[f]:[],Dt(a)),Ct(),y.shadowMap.needsUpdate=!0,E=!0}function Pt(){const a=d.titles||xt;s("steps").replaceChildren(...a.map((e,t)=>{const i=document.createElement("button");i.className="step",i.dataset.step=t,i.setAttribute("role","option");const n=document.createElement("span");n.className="number",n.textContent=t+1;const r=document.createElement("span");return r.textContent=e,i.append(n,r),i.onclick=()=>{f=t,p=0,u=!1,m=!1,S=!1,P(),x(),ye(!1)},i}))}function ye(a){const e=s("stepDropdown"),t=s("stepCounter"),i=s("stepPillArrow");if(!e)return;const n=a??e.hidden;e.hidden=!n,t.setAttribute("aria-expanded",String(n)),i.textContent=n?"✕":"▾",n&&e.querySelector("[aria-current]")?.scrollIntoView({block:"nearest"})}function x(){s("speed").textContent=`${N}×`,s("speed").setAttribute("aria-label",`Playback speed ${N} times. Change to ${N%3+1} times`);const a=d?.frames.length||0;s("stepPillText").textContent=d?`Step ${f+1}`:`${Z||"Origami"}`,s("play").innerHTML=u&&!m?te.pause:te.play,s("play").setAttribute("aria-label",u&&!m?"Pause step":p===1?"Replay step":"Play step"),s("play").title=s("play").getAttribute?.("aria-label")||"Play step",s("play").setAttribute("aria-pressed",String(u&&!m)),s("playAll").innerHTML=u&&m?te.pause:le('<path d="M5 12h14m-6-6 6 6-6 6"/>'),s("playAll").setAttribute("aria-label",u&&m?"Pause continuous playback":"Play all remaining steps"),s("playAll").title=u&&m?"Pause all":"Play all",s("playAll").setAttribute("aria-pressed",String(u&&m)),s("progress").value=Math.round(p*1e3),s("progress").style.setProperty("--fold-progress",`${p*100}%`),s("prev").disabled=!d||f===0,s("next").disabled=!d||f===a-1&&p===1,s("next").textContent=f===a-1?"Finish":"Next Step",document.querySelectorAll("#steps .step").forEach((e,t)=>{t===f?e.setAttribute("aria-current","step"):e.removeAttribute("aria-current")})}function Ee(){S=!1,f<d.frames.length-1?(f++,p=0,u=!0):(u=!1,m=!1),P(),x()}s("play").onclick=()=>{if(!d)return;const a=m;m=!1,p===1&&(p=0),u=a||!u,u||(S=!1),P(),x()};s("stepCounter").onclick=()=>{d&&ye()};const K=matchMedia("(max-width:600px)");function Ie(a){document.body.classList.toggle("mobile-layout",a),document.body.classList.toggle("force-desktop",!a&&K.matches),s("mobileToggle").setAttribute("aria-pressed",String(a))}let U=null;s("mobileToggle").onclick=()=>{U=!document.body.classList.contains("mobile-layout"),Ie(U)};function Ue(){U===null&&Ie(K.matches)}K.addEventListener("change",()=>{Ue(),U!==null&&document.body.classList.toggle("force-desktop",!U&&K.matches)});Ue();s("speed").onclick=()=>{N=N%3+1,x()};s("playAll").onclick=()=>{if(d){if(u&&m){u=!1,m=!1,S=!1,x();return}if(m=!0,S=!1,p>=1){if(f<d.frames.length-1){Ee();return}f=0,p=0}u=!0,P(),x()}};s("prev").onclick=()=>{!d||f===0||(_=null,f--,p=1,u=!1,m=!1,S=!1,P(),x())};s("next").onclick=()=>{if(d){if(p>=1){Ee();return}S=!0,u=!0,x()}};s("progress").oninput=a=>{d&&(_=null,u=!1,m=!1,S=!1,p=Number(a.target.value)/1e3,P(),x())};const Mt=["front","back","spatial"];function J(a,e){if(!c)return;_=null;const t=c.target,i=e??g.position.distanceTo(t);g.up.set(0,1,0),a==="front"?g.position.set(t.x,t.y,t.z+i):a==="back"&&g.position.set(t.x,t.y,t.z-i),c.minPolarAngle=Math.PI*.15,c.maxPolarAngle=Math.PI*.55,c.enableRotate=a==="spatial",c.update();for(const n of Mt)s(n).setAttribute("aria-pressed",String(n===a));s("paper").setAttribute("aria-label",`${Z||"Origami"} origami model, ${a} view. `+(a==="spatial"?"Drag to rotate; pinch or scroll to zoom.":"Pinch or scroll to zoom.")),E=!0}s("front").onclick=()=>J("front");s("back").onclick=()=>J("back");s("spatial").onclick=()=>J("spatial");for(const[a,e]of[["zoomIn",1/1.2],["zoomOut",1.2]])s(a).onclick=()=>{if(!c||!d)return;_=null;const t=g.position.clone().sub(c.target),i=G.clamp(t.length()*e,c.minDistance,c.maxDistance);g.position.copy(c.target).add(t.setLength(i)),c.update(),E=!0};function At(a){const e=new pe(a);return .2126*e.r+.7152*e.g+.0722*e.b>.72&&e.multiplyScalar(.42),"#"+e.getHexString()}function _e(a=!1){const e=A;A=re(V,k),v&&v.setTexture(A);for(const i of I.values())i.paper.setTexture(A),i.dirty=!0;e.dispose();const t=At(k);document.documentElement.style.setProperty("--control-accent",t),a&&document.documentElement.style.setProperty("--accent",t),document.querySelectorAll("[data-color]").forEach(i=>i.setAttribute("aria-pressed",String(i.dataset.color===k))),document.querySelectorAll("[data-pattern]").forEach(i=>{i.setAttribute("aria-pressed",String(i.dataset.pattern===V));const n=re(i.dataset.pattern,k);i.querySelector(".pattern-preview").style.backgroundImage=`url(${n.image.toDataURL()})`,n.dispose()}),E=!0}document.querySelectorAll("[data-color]").forEach(a=>a.onclick=()=>{k=a.dataset.color,_e(!0)});document.querySelectorAll("[data-pattern]").forEach(a=>a.onclick=()=>{V=a.dataset.pattern,_e()});function Lt(){const a=s("modelGrid");a.innerHTML="";for(const e of Se){const t=document.createElement("button");t.className="model-item",t.dataset.animal=e,t.setAttribute("aria-label",`${e} — preview finished model`);const i=document.createElement("canvas");i.className="model-preview",i.setAttribute("aria-hidden","true");const n=document.createElement("span");n.className="model-name",n.textContent=e,t.append(i,n),t.onclick=()=>Tt(e,t),a.append(t)}qe()}function qe(){document.querySelectorAll(".model-item").forEach(a=>{a.classList.toggle("selected",a.dataset.animal===Z)})}let W=null;function Tt(a,e){e.classList.add("pumping"),document.querySelectorAll(".model-item").forEach(t=>{t!==e&&t.classList.add("faded")}),setTimeout(()=>Rt(a),380)}async function Rt(a){const e=s("appDialog");document.querySelectorAll(".panel-content>section").forEach(i=>i.hidden=i.id!=="panel-preview"),s("panelTitle").textContent=a,e.classList.add("preview-open"),document.body.classList.add("modal-open"),s("modalScrim").hidden=!1,e.open||e.showModal(),s("previewStart").onclick=()=>{ue(),Q(),be(a)},s("previewClose").onclick=()=>{ue(),Be("models")};const t=s("previewBig");try{const i=await we(a),n=new fe({canvas:t,alpha:!0,antialias:!0});n.setPixelRatio(Math.min(devicePixelRatio||1,2));const r=new he,o=new me(36,1,.1,30),h=new ge(i,A),w=h.update(Y(i,i.frames.length-1,1));r.add(h),xe(r);const C=new ze().setFromObject(h),b=C.getSize(new T).length();o.position.copy(w).add(new T(.5,.35,1).normalize().multiplyScalar(Math.max(1,b*1.6)));const l=new ve(o,t);l.target.copy(w),l.enablePan=!1,l.update();const F=()=>{const D=t.getBoundingClientRect();D.width&&D.height&&(n.setSize(D.width,D.height,!1),o.aspect=D.width/D.height,o.updateProjectionMatrix())};F(),new ResizeObserver(F).observe(t);const O=()=>{!e.open||s("panel-preview").hidden||(n.render(r,o),requestAnimationFrame(O))};O(),W={renderer:n,scene:r,camera:o,paper:h,controls:l}}catch(i){console.warn("Big preview unavailable:",a,i)}}function ue(){W&&(W.renderer.dispose(),W=null),s("appDialog").classList.remove("preview-open"),document.querySelectorAll(".model-item").forEach(a=>a.classList.remove("pumping","faded"))}s("appDialog").addEventListener("close",()=>{ue()});let se=!1,Re;async function kt(){if(!se){se=!0;for(const a of Se.filter(e=>!Oe[e]))if(!I.has(a))try{const e=await we(a),t=document.querySelector(`[data-animal="${a}"] .model-preview`),i=Re||(Re=new fe({canvas:document.createElement("canvas"),alpha:!0,antialias:!0,preserveDrawingBuffer:!0}));i.setPixelRatio(Math.min(devicePixelRatio||1,1.5));const n=new he,r=new me(36,1,.1,30),o=new ge(e,A),h=o.update(Y(e,e.frames.length-1,1));n.add(o),xe(n);const w=new ze().setFromObject(o),C=w.getSize(new T).length();r.position.copy(h).add(new T(e.cuts?.6:a.startsWith("Dinosaur")?.55:.48,e.cuts?-.6:a.startsWith("Dinosaur")?.25:.3,1).normalize().multiplyScalar(Math.max(1,C*1.55)));const b=new ve(r,t);b.target.copy(h),b.enablePan=!1,b.enableZoom=!1,b.update();const l={renderer:i,scene:n,camera:r,paper:o,controls:b,canvas:t,context:t.getContext("2d"),dirty:!0};b.addEventListener("change",()=>l.dirty=!0),I.set(a,l),new ResizeObserver(()=>l.dirty=!0).observe(t)}catch(e){console.warn(`Preview unavailable: ${a}`,e),document.querySelector(`[data-animal="${a}"] canvas`).setAttribute("aria-label",`${a} preview unavailable. Click to select.`)}se=!1}}document.addEventListener("panel-open",a=>{if(_=null,u=!1,m=!1,S=!1,x(),a.detail==="models"){kt();for(const e of I.values())e.dirty=!0}});function He(a){const e=ie?Math.min((a-ie)/1e3,.05):0;if(ie=a,d&&!document.hidden){if(u&&!(_?.prepare&&p===0)){const t=d.motions?.[f],i=t?.type==="foundation"?d.foundation.motions[t.step]:t,n=i?.type==="cut"?12:i?.type==="panel-tree"||(i?.curve?.length||0)>1?7.2:5.6;p=Math.min(1,p+e*N/n),p===1&&(u=!1),P(),p===1&&(S||m)?Ee():x()}if(_t(e),_){const t=_;t.elapsed=Math.min(1,t.elapsed+e/t.duration);const i=t.elapsed,n=i*i*i*(i*(i*6-15)+10),r=G.lerp(t.from.length(),t.to.length(),n),o=t.from.clone().normalize(),h=t.to.clone().normalize(),w=new Pe().setFromUnitVectors(o,h),C=o.applyQuaternion(new Pe().slerp(w,n)).multiplyScalar(r);g.position.copy(c.target).add(C),c.update(),E=!0,t.elapsed===1&&(_=null)}}if(y&&E&&(R.render(),E=!1),s("appDialog").open&&!s("panel-models").hidden){for(const t of I.values())if(t.dirty){const i=t.canvas.getBoundingClientRect();if(i.width&&i.height){t.renderer.setSize(i.width,i.height,!1),t.camera.aspect=i.width/i.height,t.camera.updateProjectionMatrix(),t.renderer.render(t.scene,t.camera);const n=t.renderer.domElement;(t.canvas.width!==n.width||t.canvas.height!==n.height)&&(t.canvas.width=n.width,t.canvas.height=n.height),t.context.clearRect(0,0,t.canvas.width,t.canvas.height),t.context.drawImage(n,0,0),t.dirty=!1}}}requestAnimationFrame(He)}Lt();_e();x();be(Ge);requestAnimationFrame(He);if(document.modelContext?.registerTool)try{Promise.resolve(document.modelContext.registerTool({name:"show_origami_step",description:"Show a paused folding step for the currently selected animal.",inputSchema:{type:"object",properties:{step:{type:"integer",minimum:1},progress:{type:"number",minimum:0,maximum:1}},required:["step","progress"],additionalProperties:!1},annotations:{readOnlyHint:!1},execute(a){if(!d||!a||!Number.isInteger(a.step)||a.step<1||a.step>d.frames.length||!Number.isFinite(a.progress)||a.progress<0||a.progress>1)throw Error("Invalid step or progress");return f=a.step-1,p=a.progress,u=!1,m=!1,S=!1,P(),x(),{step:f+1,progress:p,playing:u}}})).catch(console.error)}catch(a){console.error(a)}
