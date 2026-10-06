import{M as Me,O as Te,B as Re,F as ne,S as re,U as me,V as Y,W as ke,H as ze,N as Ne,C as Fe,a as J,R as Oe,b as Be,c as Ge,L as Ie,d as Ue,e as $e,A as qe,f as He,g as Qe,h as je,m as K,i as ge,j as ve,P as Se,k as xe,s as be,l as Ve,n as le,o as we,p as Ee,Q as oe,v as Xe,q as We,D as ce,r as Ye}from"./patterns-BnzlLz58.js";const Ke={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class O{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Ze=new Te(-1,1,1,-1,0,1);class Je extends Re{constructor(){super(),this.setAttribute("position",new ne([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ne([0,2,0,0,2,0],2))}}const et=new Je;class Ce{constructor(e){this._mesh=new Me(et,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Ze)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class ye extends O{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof re?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=me.clone(e.uniforms),this.material=new re({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Ce(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class de extends O{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const r=e.getContext(),n=e.state;n.buffers.color.setMask(!1),n.buffers.depth.setMask(!1),n.buffers.color.setLocked(!0),n.buffers.depth.setLocked(!0);let l,m;this.inverse?(l=0,m=1):(l=1,m=0),n.buffers.stencil.setTest(!0),n.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),n.buffers.stencil.setFunc(r.ALWAYS,l,4294967295),n.buffers.stencil.setClear(m),n.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),n.buffers.color.setLocked(!1),n.buffers.depth.setLocked(!1),n.buffers.color.setMask(!0),n.buffers.depth.setMask(!0),n.buffers.stencil.setLocked(!1),n.buffers.stencil.setFunc(r.EQUAL,1,4294967295),n.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),n.buffers.stencil.setLocked(!0)}}class tt extends O{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class at{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new Y);this._width=i.width,this._height=i.height,t=new ke(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:ze}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new ye(Ke),this.copyPass.material.blending=Ne,this.clock=new Fe}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let r=0,n=this.passes.length;r<n;r++){const l=this.passes[r];if(l.enabled!==!1){if(l.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),l.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),l.needsSwap){if(i){const m=this.renderer.getContext(),h=this.renderer.state.buffers.stencil;h.setFunc(m.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),h.setFunc(m.EQUAL,1,4294967295)}this.swapBuffers()}de!==void 0&&(l instanceof de?i=!0:l instanceof tt&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new Y);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(i,r),this.renderTarget2.setSize(i,r);for(let n=0;n<this.passes.length;n++)this.passes[n].setSize(i,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class it extends O{constructor(e,t,i=null,r=null,n=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=r,this.clearAlpha=n,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new J}render(e,t,i){const r=e.autoClear;e.autoClear=!1;let n,l;this.overrideMaterial!==null&&(l=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(n=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(n),this.overrideMaterial!==null&&(this.scene.overrideMaterial=l),e.autoClear=r}}const st={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new Y(1/1024,1/512)}},vertexShader:`

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

		}`},G={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class nt extends O{constructor(){super(),this.uniforms=me.clone(G.uniforms),this.material=new Oe({name:G.name,uniforms:this.uniforms,vertexShader:G.vertexShader,fragmentShader:G.fragmentShader}),this._fsQuad=new Ce(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Be.getTransfer(this._outputColorSpace)===Ge&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Ie?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Ue?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===$e?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===qe?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===He?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Qe?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===je&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const F=[{number:1,title:"Classic",animals:["Crane"]},{number:2,title:"Scorpion",animals:["Scorpion"]}],ee=F.flatMap(a=>a.animals),te={},rt=[],D=a=>document.getElementById(a),y=D("appDialog");let Z;function N(){y.open&&y.close(),document.body.classList.remove("modal-open"),D("modalScrim").hidden=!0,document.querySelectorAll("#menu button").forEach((a,e)=>{a.toggleAttribute("aria-current",e===0)}),D("menu").style.setProperty("--active-tab",0)}function lt(a){if(a==="fold"){N();return}Z=document.activeElement,document.querySelectorAll(".panel-content>section").forEach(t=>t.hidden=t.id!==`panel-${a}`),D("panelTitle").textContent={steps:"Steps",color:"Paper color",paper:"Paper texture",models:"Origami library"}[a],document.body.classList.add("modal-open"),D("modalScrim").hidden=!1,y.open||y.showModal();const e={steps:0,color:1,paper:2,models:3}[a];D("menu").style.setProperty("--active-tab",e),document.querySelectorAll("#menu button").forEach((t,i)=>{t.toggleAttribute("aria-current",i===e)}),document.dispatchEvent(new CustomEvent("panel-open",{detail:a}))}function ot(){document.querySelectorAll("[data-panel]").forEach(a=>a.addEventListener("click",()=>lt(a.dataset.panel))),D("closePanel").onclick=N,y.addEventListener("close",()=>{N(),Z?.isConnected&&Z.focus()}),y.addEventListener("click",a=>{if(a.target!==y)return;const e=y.getBoundingClientRect();(a.clientX<e.left||a.clientX>e.right||a.clientY<e.top||a.clientY>e.bottom)&&N()})}const s=a=>document.getElementById(a),U=a=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${a}</svg>`,$={play:U('<path d="m8 5 11 7-11 7z"/>'),pause:U('<path d="M8 5v14M16 5v14"/>'),x:U('<path d="m6 6 12 12M18 6 6 18"/>')},ue=new URLSearchParams(document.location?.search||"").get("animal"),ae=ee.includes(ue)?ue:"Crane";let H=ae,c,p=0,u=0,o=!1,f=!1,v=!1,R=1,V=0,_="#087b96",q="solid",L=K(q,_),fe=null,b=null,x,M,g,d,w,A,E=!0,X=0;const I=new Map,k=new Map;ot();function _e(a,e=!1){a.add(new We(16777215,7899549,1.5));const t=new ce(16774887,2.5);t.position.set(-3.5,4,5),t.castShadow=e,e&&(t.shadow.mapSize.set(2048,2048),Object.assign(t.shadow.camera,{left:-3,right:3,top:3,bottom:-3,near:.1,far:20}),t.shadow.intensity=.12,t.shadow.bias=-3e-4,t.shadow.normalBias=.008),a.add(t);const i=new ce(13031926,.95);i.position.set(3,-1,-5),a.add(i)}function ct(){x=new ge({canvas:s("paper"),antialias:!0}),x.setPixelRatio(Math.min(devicePixelRatio||1,2)),x.shadowMap.enabled=!0,x.shadowMap.autoUpdate=!1,x.shadowMap.needsUpdate=!0,x.shadowMap.type=Ye,M=new ve,M.background=new J("#ffffff"),g=new Se(36,1,.1,30),g.position.set(.5,3.2,4.2),d=new we(g,s("paper")),d.enablePan=!1,d.zoomToCursor=!1,d.minDistance=1.5,d.maxDistance=12,d.maxPolarAngle=Math.PI*.55,d.minPolarAngle=Math.PI*.15,d.addEventListener("change",()=>E=!0),d.addEventListener("start",()=>{b=null}),_e(M,!1),A=new at(x),A.addPass(new it(M,g)),A.addPass(new nt);const a=new ye(st);A.addPass(a);const e=()=>{const t=s("paper").getBoundingClientRect();if(!t.width||!t.height)return;x.setSize(t.width,t.height,!1),g.aspect=t.width/t.height,g.updateProjectionMatrix(),A.setSize(t.width,t.height);const i=x.getPixelRatio();a.uniforms.resolution.value.set(1/(t.width*i),1/(t.height*i)),E=!0};new ResizeObserver(e).observe(s("paper")),e(),s("paper").addEventListener("webglcontextlost",t=>{t.preventDefault(),o=!1,f=!1,v=!1,z("3D view interrupted","Reload this page to restore the graphics view.")})}async function De(a){if(I.has(a))return I.get(a);const e=(async()=>{const t=await fetch(a==="Crane"?"./crane-motion.json":`./models/${a.toLowerCase()}.json`);if(!t.ok)throw Error("Model unavailable");const i=await t.json();if(Xe(i,a),i.complete!==!0)throw Error("Folding lesson is incomplete");return i})();I.set(a,e);try{return await e}catch(t){throw I.delete(a),t}}function z(a,e,t){s("modelMessage").hidden=!1,s("messageTitle").textContent=a,s("messageText").textContent=e,s("referenceLink").hidden=!0,s("playback").hidden=!0,s("stepCounter").hidden=!0}function dt(){b=null,w&&(M.remove(w),w.dispose(),w=null),c=null,o=!1,f=!1,v=!1,s("steps").replaceChildren(),E=!0}async function T(a,e="default"){const t=++V;if(fe?.(),fe=null,s("appSurface").style.minHeight="",s("videoLesson").hidden=!0,s("paper").hidden=!1,s("viewControls").hidden=!1,s("front").hidden=!1,s("overhead").hidden=!1,s("back").hidden=!1,s("spatial").hidden=!1,s("menuColor").disabled=!1,s("menuPaper").disabled=!1,s("retry").hidden=!0,H=a,document.title=a?`${a} — Origami`:"Origami",Pe(),x&&dt(),!a){s("paper").setAttribute("aria-label","Origami workspace"),z("Choose a model","Select a tutorial from Models to begin.");return}if(te[a]){s("viewControls").hidden=!0,z(a,"The native 3D folding sequence is not ready yet. This animal cannot currently be folded in the app.");return}z("Loading…","");try{const i=await De(a);if(t!==V)return;x||ct(),c=i,p=0,u=0,o=!1,f=!1,v=!1,w=new xe(c,L),w.rotation.set(Math.PI,Math.PI,0),M.add(w),d.target.set(0,0,0),B("front",5.2),s("modelMessage").hidden=!0,s("playback").hidden=!1,s("stepCounter").hidden=!1,ft(),C(),S()}catch(i){if(t!==V)return;console.error(i),z("Unable to show the 3D model",/WebGL|context/i.test(i.message)?"3D graphics are unavailable in this browser. Try a browser with graphics acceleration enabled.":"The model could not load. Please try again."),s("retry").hidden=!1,s("retry").onclick=()=>{s("retry").hidden=!0,T(a)}}}function ut(){return c.surfaceMarks&&p===c.frames.length-1&&u===1?[]:[...new Set(c.activeEdges.slice(0,p+(u>=1?1:0)).flat())]}function C(){!w||!c||(w.update(be(c,p,u),ut(),u<1?c.activeEdges[p]:[]),x.shadowMap.needsUpdate=!0,E=!0)}function ft(){const a=c.titles||rt;s("steps").replaceChildren(...a.map((e,t)=>{const i=document.createElement("button");i.className="step",i.dataset.step=t;const r=document.createElement("span");r.className="number",r.textContent=t+1;const n=document.createElement("span");return n.textContent=e,i.append(r,n),i.onclick=()=>{p=t,u=0,o=!1,f=!1,v=!1,C(),S(),N()},i}))}function S(){s("speed").textContent=`${R}×`,s("speed").setAttribute("aria-label",`Playback speed ${R} times. Change to ${R%3+1} times`);const a=c?.frames.length||0;s("stepCounter").textContent=`${H||"Origami"} – ${c?.motions?.[p]?.type==="cut"?"Cut":"Step"} ${p+1} / ${a}`,s("play").innerHTML=o&&!f?$.pause:$.play,s("play").setAttribute("aria-label",o&&!f?"Pause step":u===1?"Replay step":"Play step"),s("play").title=s("play").getAttribute?.("aria-label")||"Play step",s("play").setAttribute("aria-pressed",String(o&&!f)),s("playAll").innerHTML=o&&f?$.pause:U('<path d="M5 12h14m-6-6 6 6-6 6"/>'),s("playAll").setAttribute("aria-label",o&&f?"Pause continuous playback":"Play all remaining steps"),s("playAll").title=o&&f?"Pause all":"Play all",s("playAll").setAttribute("aria-pressed",String(o&&f)),s("progress").value=Math.round(u*1e3),s("progress").style.setProperty("--fold-progress",`${u*100}%`),s("prev").disabled=!c||p===0,s("next").disabled=!c||p===a-1&&u===1,s("next").textContent=p===a-1?"Finish":"Next Step",document.querySelectorAll("#steps .step").forEach((e,t)=>{t===p?e.setAttribute("aria-current","step"):e.removeAttribute("aria-current")})}function ie(){v=!1,p<c.frames.length-1?(p++,u=0,o=!0):(o=!1,f=!1),C(),S()}s("play").onclick=()=>{if(!c)return;const a=f;f=!1,u===1&&(u=0),o=a||!o,o||(v=!1),C(),S()};s("speed").onclick=()=>{R=R%3+1,S()};s("playAll").onclick=()=>{if(c){if(o&&f){o=!1,f=!1,v=!1,S();return}if(f=!0,v=!1,u>=1){if(p<c.frames.length-1){ie();return}p=0,u=0}o=!0,C(),S()}};s("prev").onclick=()=>{!c||p===0||(b=null,p--,u=1,o=!1,f=!1,v=!1,C(),S())};s("next").onclick=()=>{if(c){if(u>=1){ie();return}v=!0,o=!0,S()}};s("progress").oninput=a=>{c&&(b=null,o=!1,f=!1,v=!1,u=Number(a.target.value)/1e3,C(),S())};const pt=["front","overhead","back","spatial"];function B(a,e){if(!d)return;b=null;const t=d.target,i=e??g.position.distanceTo(t);a==="overhead"?(g.up.set(0,0,-1),g.position.set(t.x,t.y+i,t.z),d.minPolarAngle=0):(g.up.set(0,1,0),a==="front"?g.position.set(t.x,t.y,t.z+i):a==="back"&&g.position.set(t.x,t.y,t.z-i),d.minPolarAngle=Math.PI*.15),d.maxPolarAngle=Math.PI*.55,d.enableRotate=a==="spatial",d.update();for(const r of pt)s(r).setAttribute("aria-pressed",String(r===a));s("paper").setAttribute("aria-label",`${H||"Origami"} origami model, ${a} view. `+(a==="spatial"?"Drag to rotate; pinch or scroll to zoom.":"Pinch or scroll to zoom.")),E=!0}s("front").onclick=()=>B("front");s("overhead").onclick=()=>B("overhead");s("back").onclick=()=>B("back");s("spatial").onclick=()=>B("spatial");for(const[a,e]of[["zoomIn",1/1.2],["zoomOut",1.2]])s(a).onclick=()=>{if(!d||!c)return;b=null;const t=g.position.clone().sub(d.target),i=Ee.clamp(t.length()*e,d.minDistance,d.maxDistance);g.position.copy(d.target).add(t.setLength(i)),d.update(),E=!0};function se(){const a=L;L=K(q,_),w?.setTexture(L);for(const e of k.values())e.paper.setTexture(L),e.dirty=!0;a.dispose(),document.documentElement.style.setProperty("--control-accent",new J(_).getHSL({}).l>.5?"#b74626":_),document.querySelectorAll("[data-color]").forEach(e=>e.setAttribute("aria-pressed",String(e.dataset.color===_))),document.querySelectorAll("[data-pattern]").forEach(e=>{e.setAttribute("aria-pressed",String(e.dataset.pattern===q));const t=K(e.dataset.pattern,_);e.querySelector(".pattern-preview").style.backgroundImage=`url(${t.image.toDataURL()})`,t.dispose()}),E=!0}document.querySelectorAll("[data-color]").forEach(a=>a.onclick=()=>{_=a.dataset.color,se()});document.querySelectorAll("[data-pattern]").forEach(a=>a.onclick=()=>{q=a.dataset.pattern,se()});function Pe(){document.querySelectorAll(".animal-card").forEach(a=>{const e=a.dataset.animal===H;a.classList.toggle("selected",e),a.querySelector(".animal-name").setAttribute("aria-pressed",String(e)),a.querySelector(".deselect").hidden=!e})}let Ae=F.find(a=>a.animals.includes(ae)).number;function pe(a){const e=F.find(t=>t.number===a);if(e?.animals.length){Ae=a,s("levelTitle").textContent=`Level ${a} — ${e.title}`,s("sourceCredit").textContent=a===1?"Crane: adapted from Origami Odyssey · Robb Doering.":"Scorpion: simplified model · inspired by Donya Quick.";for(const t of s("animals").children)t.hidden=Number(t.dataset.level)!==a;for(const t of s("levels").children)t.setAttribute("aria-pressed",String(Number(t.dataset.level)===a));for(const t of k.values())t.dirty=!0}}function ht(){for(const a of F){const e=document.createElement("button");e.dataset.level=a.number,e.disabled=!a.animals.length,e.disabled&&(e.title="Lessons being rebuilt",e.setAttribute("aria-label",`Level ${a.number} — lessons being rebuilt`)),e.textContent=`Level ${a.number}`,e.onclick=()=>pe(a.number),s("levels").append(e)}for(const a of ee){const e=F.find(n=>n.animals.includes(a)).number,t=document.createElement("article");t.className="animal-card",t.dataset.animal=a,t.dataset.level=e;const i=document.createElement("button");i.className="animal-name",i.textContent=a,a==="Turtle"&&(i.title="Simple turtle profile"),i.onclick=()=>T(a);const r=document.createElement("button");if(r.className="deselect",r.innerHTML=$.x,r.setAttribute("aria-label",`Deselect ${a}`),r.onclick=()=>T(null),te[a]){const n=document.createElement("div");n.className="native-pending",n.textContent="3D in development",t.append(n)}else{const n=document.createElement("canvas");n.setAttribute("aria-label",`${a} finished model. Drag to rotate. Click to select.`),n.tabIndex=0;let l,m=!1;n.addEventListener("pointerdown",h=>{l=[h.clientX,h.clientY],m=!1}),n.addEventListener("pointermove",h=>{l&&Math.hypot(h.clientX-l[0],h.clientY-l[1])>5&&(m=!0)}),n.addEventListener("pointerup",()=>{l&&!m&&T(a,"study"),l=null}),n.addEventListener("pointercancel",()=>l=null),n.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),T(a,"study"))}),t.append(n)}if(t.append(i,r),a==="Dragonfly"){const n=document.createElement("span");n.className="lesson-badge",n.textContent="Cut & fold",t.append(n)}s("animals").append(t)}Pe(),pe(Ae)}let W=!1,he;async function mt(){if(!W){W=!0;for(const a of ee.filter(e=>!te[e]))if(!k.has(a))try{const e=await De(a),t=document.querySelector(`[data-animal="${a}"] canvas`),i=he||(he=new ge({canvas:document.createElement("canvas"),alpha:!0,antialias:!0,preserveDrawingBuffer:!0}));i.setPixelRatio(Math.min(devicePixelRatio||1,1.5));const r=new ve,n=new Se(36,1,.1,30),l=new xe(e,L),m=l.update(be(e,e.frames.length-1,1));r.add(l),_e(r);const h=new Ve().setFromObject(l),Q=h.getSize(new le).length();n.position.copy(m).add(new le(e.cuts?.6:a.startsWith("Dinosaur")?.55:.48,e.cuts?-.6:a.startsWith("Dinosaur")?.25:.3,1).normalize().multiplyScalar(Math.max(1,Q*1.55)));const P=new we(n,t);P.target.copy(m),P.enablePan=!1,P.enableZoom=!1,P.update();const j={renderer:i,scene:r,camera:n,paper:l,controls:P,canvas:t,context:t.getContext("2d"),dirty:!0};P.addEventListener("change",()=>j.dirty=!0),k.set(a,j),new ResizeObserver(()=>j.dirty=!0).observe(t)}catch(e){console.warn(`Preview unavailable: ${a}`,e),document.querySelector(`[data-animal="${a}"] canvas`).setAttribute("aria-label",`${a} preview unavailable. Click to select.`)}W=!1}}document.addEventListener("panel-open",a=>{if(b=null,o=!1,f=!1,v=!1,S(),a.detail==="models"){mt();for(const e of k.values())e.dirty=!0}});function Le(a){const e=X?Math.min((a-X)/1e3,.05):0;if(X=a,c&&!document.hidden){if(o&&!(b?.prepare&&u===0)){const t=c.motions?.[p],i=t?.type==="foundation"?c.foundation.motions[t.step]:t,r=i?.type==="cut"?12:i?.type==="panel-tree"||(i?.curve?.length||0)>1?7.2:5.6;u=Math.min(1,u+e*(v?3:R)/r),u===1&&(o=!1),C(),u===1&&(v||f)?ie():S()}if(b){const t=b;t.elapsed=Math.min(1,t.elapsed+e/t.duration);const i=t.elapsed,r=i*i*i*(i*(i*6-15)+10),n=Ee.lerp(t.from.length(),t.to.length(),r),l=t.from.clone().normalize(),m=t.to.clone().normalize(),h=new oe().setFromUnitVectors(l,m),Q=l.applyQuaternion(new oe().slerp(h,r)).multiplyScalar(n);g.position.copy(d.target).add(Q),d.update(),E=!0,t.elapsed===1&&(b=null)}}if(x&&E&&(A.render(),E=!1),s("appDialog").open&&!s("panel-models").hidden){for(const t of k.values())if(t.dirty){const i=t.canvas.getBoundingClientRect();if(i.width&&i.height){t.renderer.setSize(i.width,i.height,!1),t.camera.aspect=i.width/i.height,t.camera.updateProjectionMatrix(),t.renderer.render(t.scene,t.camera);const r=t.renderer.domElement;(t.canvas.width!==r.width||t.canvas.height!==r.height)&&(t.canvas.width=r.width,t.canvas.height=r.height),t.context.clearRect(0,0,t.canvas.width,t.canvas.height),t.context.drawImage(r,0,0),t.dirty=!1}}}requestAnimationFrame(Le)}ht();se();S();T(ae);requestAnimationFrame(Le);if(document.modelContext?.registerTool)try{Promise.resolve(document.modelContext.registerTool({name:"show_origami_step",description:"Show a paused folding step for the currently selected animal.",inputSchema:{type:"object",properties:{step:{type:"integer",minimum:1},progress:{type:"number",minimum:0,maximum:1}},required:["step","progress"],additionalProperties:!1},annotations:{readOnlyHint:!1},execute(a){if(!c||!a||!Number.isInteger(a.step)||a.step<1||a.step>c.frames.length||!Number.isFinite(a.progress)||a.progress<0||a.progress>1)throw Error("Invalid step or progress");return p=a.step-1,u=a.progress,o=!1,f=!1,v=!1,C(),S(),{step:p+1,progress:u,playing:o}}})).catch(console.error)}catch(a){console.error(a)}
