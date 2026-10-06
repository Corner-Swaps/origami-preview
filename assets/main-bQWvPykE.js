import{M as tt,O as at,B as st,F as Le,S as Pe,U as Ge,V as Se,W as nt,H as it,N as rt,C as ot,a as we,R as lt,b as ct,c as dt,L as ut,d as ft,e as pt,A as ht,f as mt,g as gt,h as vt,i as T,j as St,s as bt,v as xt,k as wt,l as pe,m as be,n as Ie,o as Ue,P as $e,p as qe,q as ye,r as yt,t as He,Q as Te,u as Et,w as Ct,D as ke,x as _t}from"./patterns-DoxKQS7I.js";const Dt={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class re{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Mt=new at(-1,1,1,-1,0,1);class At extends st{constructor(){super(),this.setAttribute("position",new Le([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Le([0,2,0,0,2,0],2))}}const Lt=new At;class je{constructor(e){this._mesh=new tt(Lt,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Mt)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Qe extends re{constructor(e,a="tDiffuse"){super(),this.textureID=a,this.uniforms=null,this.material=null,e instanceof Pe?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Ge.clone(e.uniforms),this.material=new Pe({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new je(this.material)}render(e,a,s){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=s.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(a),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Re extends re{constructor(e,a){super(),this.scene=e,this.camera=a,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,a,s){const r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let o,c;this.inverse?(o=0,c=1):(o=1,c=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,o,4294967295),i.buffers.stencil.setClear(c),i.buffers.stencil.setLocked(!0),e.setRenderTarget(s),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(a),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}}class Pt extends re{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class Tt{constructor(e,a){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),a===void 0){const s=e.getSize(new Se);this._width=s.width,this._height=s.height,a=new nt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:it}),a.texture.name="EffectComposer.rt1"}else this._width=a.width,this._height=a.height;this.renderTarget1=a,this.renderTarget2=a.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Qe(Dt),this.copyPass.material.blending=rt,this.clock=new ot}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,a){this.passes.splice(a,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const a=this.passes.indexOf(e);a!==-1&&this.passes.splice(a,1)}isLastEnabledPass(e){for(let a=e+1;a<this.passes.length;a++)if(this.passes[a].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const a=this.renderer.getRenderTarget();let s=!1;for(let r=0,i=this.passes.length;r<i;r++){const o=this.passes[r];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,s),o.needsSwap){if(s){const c=this.renderer.getContext(),p=this.renderer.state.buffers.stencil;p.setFunc(c.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),p.setFunc(c.EQUAL,1,4294967295)}this.swapBuffers()}Re!==void 0&&(o instanceof Re?s=!0:o instanceof Pt&&(s=!1))}}this.renderer.setRenderTarget(a)}reset(e){if(e===void 0){const a=this.renderer.getSize(new Se);this._pixelRatio=this.renderer.getPixelRatio(),this._width=a.width,this._height=a.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,a){this._width=e,this._height=a;const s=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(s,r),this.renderTarget2.setSize(s,r);for(let i=0;i<this.passes.length;i++)this.passes[i].setSize(s,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class kt extends re{constructor(e,a,s=null,r=null,i=null){super(),this.scene=e,this.camera=a,this.overrideMaterial=s,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new we}render(e,a,s){const r=e.autoClear;e.autoClear=!1;let i,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:s),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=r}}const Rt={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new Se(1/1024,1/512)}},vertexShader:`

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

		}`},ce={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class zt extends re{constructor(){super(),this.uniforms=Ge.clone(ce.uniforms),this.material=new lt({name:ce.name,uniforms:this.uniforms,vertexShader:ce.vertexShader,fragmentShader:ce.fragmentShader}),this._fsQuad=new je(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,a,s){this.uniforms.tDiffuse.value=s.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},ct.getTransfer(this._outputColorSpace)===dt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===ut?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===ft?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===pt?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===ht?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===mt?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===gt?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===vt&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(a),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const ze=new WeakMap,Nt=[0,.12,.32,.5,.68,.88,1],Ft=t=>t.map(e=>new T(...e));function Ot(t,e,a){let s=ze.get(t);if((!s||s.sample!==a)&&(s={sample:a,steps:new Map},ze.set(t,s)),!s.steps.has(e)){const r=t.cuts?{...t,faces:xt(t,e,0)}:t;s.steps.set(e,{data:r,inspection:Bt(r,e,a)})}return s.steps.get(e)}function Bt(t,e,a){const s=Nt.map(o=>Ft(a(t,e,o))),r=t.faces.map((o,c)=>{const[p,y,b]=o.map(g=>s[0][g]),P=y.clone().sub(p).cross(b.clone().sub(p)).length()/2,B=o.reduce((g,x)=>g+s.slice(1).reduce((S,L,D)=>S+L[x].distanceTo(s[D][x]),0),0)/3;return{index:c,area:P,weight:P*B}}),i=r.filter(o=>o.weight>1e-10).sort((o,c)=>c.weight-o.weight);return{poses:s,moving:i,scores:new Map,totalArea:r.reduce((o,c)=>o+c.area,0)}}function Gt(t,e,a,s){const r=a.clone().normalize(),i=e.moving.slice(0,8);if(!i.length)return r;const o=[r];s&&o.push(new T(...s).normalize());for(const g of[-1,0,1])for(const x of[-.65,0,.65])for(const S of[-1,0,1])g===0&&S===0||o.push(new T(g,x,S).normalize());const c=e.records||(e.records=e.poses.map(g=>({points:g,faces:i.map(x=>{const[S,L,D]=t.faces[x.index].map(R=>g[R]);return{...x,normal:L.clone().sub(S).cross(D.clone().sub(S)).normalize(),center:S.clone().add(L).add(D).multiplyScalar(1/3),probe:S.clone().multiplyScalar(.6).addScaledVector(L,.2).addScaledVector(D,.2)}})}))),p=i.reduce((g,x)=>g+x.weight,0),y=new wt,b=new T;let P=r,B=-1/0;for(const g of o){const x=g.toArray().map(D=>D.toFixed(10)).join(",");let S=e.scores.get(x);if(S===void 0){let D=0,R=1,Q=0,V=0;for(let G=0;G<c.length;G++){const{points:ae,faces:C}=c[G];let F=0;for(let I=0;I<C.length;I++){const M=C[I];let U=0;for(const $ of[M.center,M.probe]){y.set($.clone().addScaledVector(g,2e-4),g);let q=!1;for(let X=0;X<t.faces.length;X++){if(X===M.index)continue;const[Ze,Je,et]=t.faces[X];if(y.intersectTriangle(ae[Ze],ae[Je],ae[et],!1,b)){q=!0;break}}q||(U+=.5)}const le=Math.abs(M.normal.dot(g));if(F+=M.weight*U*(.2+.8*le),G){const $=M.center.clone().sub(c[G-1].faces[I].center),q=$.length();if(q>1e-9){const X=Math.sqrt(Math.max(0,1-($.dot(g)/q)**2));Q+=M.weight*q*X,V+=M.weight*q}}}const W=F/p;D+=W,R=Math.min(R,W)}S=.38*D/c.length+.21*R+.38*(V?Q/V:0),e.scores.size>=64&&e.scores.delete(e.scores.keys().next().value),e.scores.set(x,S)}const L=S+.03*g.dot(r);L>B&&(B=L,P=g)}return P.clone()}function It(t,e,a,s,{fov:r=36,aspect:i=1,minDistance:o=1.5,maxDistance:c=12}={}){const p=Ot(t,e,a);t=p.data;const y=p.inspection,b=t.motions?.[e]?.type==="cut"?new T(...St(a(t,e,0),t.faces,t.cuts.find(C=>C.step===e).path)):Gt(t,y,s,t.authoredViews?.[e]),B=(Math.abs(b.y)>.98?new T(1,0,0):new T(0,1,0)).clone().cross(b).normalize(),g=b.clone().cross(B).normalize(),x=Math.tan(pe.degToRad(r/2)),S=x*Math.max(i,.1),L=new Set(y.moving.flatMap(C=>t.faces[C.index]));for(const C of t.activeEdges[e])for(const F of t.edges[C])L.add(F);const D=new Set(t.faces.flat());let R=0,Q=0;for(const C of y.poses){const F=bt(C.map(W=>W.toArray()),t.faces);C.forEach((W,I)=>{if(!D.has(I))return;const M=W.clone().sub(F),U=M.dot(b),le=Math.abs(M.dot(B)),$=Math.abs(M.dot(g));R=Math.max(R,U+le/(S*.86),U+$/(x*.84)),L.has(I)&&(Q=Math.max(Q,U+le/(S*.78),U+$/(x*.76)))})}const V=y.moving.reduce((C,F)=>C+F.area,0)/Math.max(y.totalArea,1e-9),G=V<.18?.86:1,ae=pe.clamp(Math.max(R*G,Q),o,c);return{direction:b,distance:ae,detail:V<.18}}const ie=[{number:1,title:"Classic",animals:["Crane"]},{number:2,title:"Scorpion",animals:["Scorpion"]}],Ee=ie.flatMap(t=>t.animals),Ce={},Ut=[],j=t=>document.getElementById(t),O=j("appDialog");let xe;function ne(){O.open&&O.close(),document.body.classList.remove("modal-open"),j("modalScrim").hidden=!0,document.querySelectorAll("#menu button").forEach((t,e)=>{t.toggleAttribute("aria-current",e===0)}),j("menu").style.setProperty("--active-tab",0)}function $t(t){if(t==="fold"){ne();return}xe=document.activeElement,document.querySelectorAll(".panel-content>section").forEach(a=>a.hidden=a.id!==`panel-${t}`),j("panelTitle").textContent={steps:"Steps",color:"Paper color",paper:"Paper texture",models:"Origami library"}[t],document.body.classList.add("modal-open"),j("modalScrim").hidden=!1,O.open||O.showModal();const e={steps:0,color:1,paper:2,models:3}[t];j("menu").style.setProperty("--active-tab",e),document.querySelectorAll("#menu button").forEach((a,s)=>{a.toggleAttribute("aria-current",s===e)}),document.dispatchEvent(new CustomEvent("panel-open",{detail:t}))}function qt(){document.querySelectorAll("[data-panel]").forEach(t=>t.addEventListener("click",()=>$t(t.dataset.panel))),j("closePanel").onclick=ne,O.addEventListener("close",()=>{ne(),xe?.isConnected&&xe.focus()}),O.addEventListener("click",t=>{if(t.target!==O)return;const e=O.getBoundingClientRect();(t.clientX<e.left||t.clientX>e.right||t.clientY<e.top||t.clientY>e.bottom)&&ne()})}const n=t=>document.getElementById(t),ue=t=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`,fe={play:ue('<path d="m8 5 11 7-11 7z"/>'),pause:ue('<path d="M8 5v14M16 5v14"/>'),x:ue('<path d="m6 6 12 12M18 6 6 18"/>')},Ne=new URLSearchParams(document.location?.search||"").get("animal"),_e=Ee.includes(Ne)?Ne:"Crane";let De=_e,l,m=0,f=0,d=!1,h=!1,w=!1,ee=1,me=0,H="#087b96",he="washi",K=be(he,H),Fe=null,A=null,_,Z,v,u,z,Y,k=!0,ge=0;const de=new Map,te=new Map;qt();function Ve(t,e=!1){t.add(new Ct(16777215,7899549,1.5));const a=new ke(16774887,2.5);a.position.set(-3.5,4,5),a.castShadow=e,e&&(a.shadow.mapSize.set(2048,2048),Object.assign(a.shadow.camera,{left:-3,right:3,top:3,bottom:-3,near:.1,far:20}),a.shadow.intensity=.12,a.shadow.bias=-3e-4,a.shadow.normalBias=.008),t.add(a);const s=new ke(13031926,.95);s.position.set(3,-1,-5),t.add(s)}function Ht(){_=new Ie({canvas:n("paper"),antialias:!0}),_.setPixelRatio(Math.min(devicePixelRatio||1,2)),_.shadowMap.enabled=!0,_.shadowMap.autoUpdate=!1,_.shadowMap.needsUpdate=!0,_.shadowMap.type=_t,Z=new Ue,Z.background=new we("#edf0f3"),v=new $e(36,1,.1,30),v.position.set(1.2,.8,6),u=new He(v,n("paper")),u.enablePan=!1,u.zoomToCursor=!1,u.minDistance=1.5,u.maxDistance=12,u.addEventListener("change",()=>k=!0),u.addEventListener("start",()=>{A=null,n("front").setAttribute("aria-pressed","false"),n("back").setAttribute("aria-pressed","false")}),Ve(Z,!0),Y=new Tt(_),Y.addPass(new kt(Z,v)),Y.addPass(new zt);const t=new Qe(Rt);Y.addPass(t);const e=()=>{const a=n("paper").getBoundingClientRect();if(!a.width||!a.height)return;_.setSize(a.width,a.height,!1),v.aspect=a.width/a.height,v.updateProjectionMatrix(),Y.setSize(a.width,a.height);const s=_.getPixelRatio();t.uniforms.resolution.value.set(1/(a.width*s),1/(a.height*s)),k=!0};new ResizeObserver(e).observe(n("paper")),e(),n("paper").addEventListener("webglcontextlost",a=>{a.preventDefault(),d=!1,h=!1,w=!1,se("3D view interrupted","Reload this page to restore the graphics view.")})}async function We(t){if(de.has(t))return de.get(t);const e=(async()=>{const a=await fetch(t==="Crane"?"./crane-motion.json":`./models/${t.toLowerCase()}.json`);if(!a.ok)throw Error("Model unavailable");const s=await a.json();if(Et(s,t),s.complete!==!0)throw Error("Folding lesson is incomplete");return s})();de.set(t,e);try{return await e}catch(a){throw de.delete(t),a}}function se(t,e,a){n("modelMessage").hidden=!1,n("messageTitle").textContent=t,n("messageText").textContent=e,n("referenceLink").hidden=!0,n("playback").hidden=!0,n("stepCounter").hidden=!0}function jt(){A=null,z&&(Z.remove(z),z.dispose(),z=null),l=null,d=!1,h=!1,w=!1,n("steps").replaceChildren(),k=!0}async function J(t,e="default"){const a=++me;if(Fe?.(),Fe=null,n("appSurface").style.minHeight="",n("videoLesson").hidden=!0,n("paper").hidden=!1,n("viewControls").hidden=!1,n("front").hidden=!1,n("back").hidden=!1,n("menuColor").disabled=!1,n("menuPaper").disabled=!1,n("retry").hidden=!0,De=t,document.title=t?`${t} — Origami`:"Origami",Xe(),_&&jt(),n("paper").setAttribute("aria-label",t?`${t} origami model. Drag to rotate; pinch or scroll to zoom.`:"Origami workspace"),!t){se("Choose a model","Select a tutorial from Models to begin.");return}if(Ce[t]){n("viewControls").hidden=!0,se(t,"The native 3D folding sequence is not ready yet. This animal cannot currently be folded in the app.");return}se("Loading…","");try{const s=await We(t);if(a!==me)return;_||Ht(),l=s,m=0,f=0,d=!1,h=!1,w=!1,z=new qe(l,K),Z.add(z),u.target.set(0,0,0),v.position.set(t.startsWith("Dinosaur")?2.8:1.2,t.startsWith("Dinosaur")?1.4:.8,Math.max(6,3/(2*Math.tan(Math.PI/10)*v.aspect))),u.update(),n("modelMessage").hidden=!0,n("playback").hidden=!1,n("stepCounter").hidden=!1,Vt(),N(),E()}catch(s){if(a!==me)return;console.error(s),se("Unable to show the 3D model",/WebGL|context/i.test(s.message)?"3D graphics are unavailable in this browser. Try a browser with graphics acceleration enabled.":"The model could not load. Please try again."),n("retry").hidden=!1,n("retry").onclick=()=>{n("retry").hidden=!0,J(t)}}}function Qt(){return l.surfaceMarks&&m===l.frames.length-1&&f===1?[]:[...new Set(l.activeEdges.slice(0,m+(f>=1?1:0)).flat())]}function N(){if(!z||!l)return;const t=z.update(ye(l,m,f),Qt(),f<1?l.activeEdges[m]:[]),e=t.clone().sub(u.target);v.position.add(e),u.target.copy(t),u.update(),_.shadowMap.needsUpdate=!0,k=!0}function oe(){if(!l||!u)return;const t=v.position.clone().sub(u.target),e=It(l,m,ye,t,{fov:v.fov,aspect:v.aspect,minDistance:u.minDistance,maxDistance:u.maxDistance}),a=t.angleTo(e.direction),s=Math.abs(Math.log(e.distance/t.length())),r=Math.max(1.5,a*1.875/(Math.PI/2),s*1.8);A={from:t,to:e.direction.multiplyScalar(e.distance),elapsed:0,duration:r,prepare:f===0&&a>Math.PI/4},n("front").setAttribute("aria-pressed","false"),n("back").setAttribute("aria-pressed","false")}function Vt(){const t=l.titles||Ut;n("steps").replaceChildren(...t.map((e,a)=>{const s=document.createElement("button");s.className="step",s.dataset.step=a;const r=document.createElement("span");r.className="number",r.textContent=a+1;const i=document.createElement("span");return i.textContent=e,s.append(r,i),s.onclick=()=>{m=a,f=0,d=!1,h=!1,w=!1,N(),oe(),E(),ne()},s}))}function E(){n("speed").textContent=`${ee}×`,n("speed").setAttribute("aria-label",`Playback speed ${ee} times. Change to ${ee%3+1} times`);const t=l?.frames.length||0;n("stepCounter").textContent=`${De||"Origami"} – ${l?.motions?.[m]?.type==="cut"?"Cut":"Step"} ${m+1} / ${t}`,n("play").innerHTML=d&&!h?fe.pause:fe.play,n("play").setAttribute("aria-label",d&&!h?"Pause step":f===1?"Replay step":"Play step"),n("play").title=n("play").getAttribute?.("aria-label")||"Play step",n("play").setAttribute("aria-pressed",String(d&&!h)),n("playAll").innerHTML=d&&h?fe.pause:ue('<path d="M5 12h14m-6-6 6 6-6 6"/>'),n("playAll").setAttribute("aria-label",d&&h?"Pause continuous playback":"Play all remaining steps"),n("playAll").title=d&&h?"Pause all":"Play all",n("playAll").setAttribute("aria-pressed",String(d&&h)),n("progress").value=Math.round(f*1e3),n("progress").style.setProperty("--fold-progress",`${f*100}%`),n("prev").disabled=!l||m===0,n("next").disabled=!l||m===t-1&&f===1,n("next").textContent=m===t-1?"Finish":"Next Step",document.querySelectorAll("#steps .step").forEach((e,a)=>{a===m?e.setAttribute("aria-current","step"):e.removeAttribute("aria-current")})}function Me(){w=!1,m<l.frames.length-1?(m++,f=0,d=!0,oe()):(d=!1,h=!1),N(),E()}n("play").onclick=()=>{if(!l)return;const t=h;h=!1,f===1&&(f=0),d=t||!d,d||(w=!1),N(),d&&f===0&&oe(),E()};n("speed").onclick=()=>{ee=ee%3+1,E()};n("playAll").onclick=()=>{if(l){if(d&&h){d=!1,h=!1,w=!1,E();return}if(h=!0,w=!1,f>=1){if(m<l.frames.length-1){Me();return}m=0,f=0}d=!0,N(),f===0&&oe(),E()}};n("prev").onclick=()=>{!l||m===0||(A=null,m--,f=1,d=!1,h=!1,w=!1,N(),oe(),E())};n("next").onclick=()=>{if(l){if(f>=1){Me();return}w=!0,d=!0,E()}};n("progress").oninput=t=>{l&&(A=null,d=!1,h=!1,w=!1,f=Number(t.target.value)/1e3,N(),E())};for(const[t,e]of[["front",1],["back",-1]])n(t).onclick=()=>{if(!u)return;A=null;const a=v.position.distanceTo(u.target);v.position.copy(u.target).add(new T(0,0,e*a)),v.up.set(0,1,0),u.update(),n("front").setAttribute("aria-pressed",String(t==="front")),n("back").setAttribute("aria-pressed",String(t==="back")),k=!0};for(const[t,e]of[["zoomIn",1/1.2],["zoomOut",1.2]])n(t).onclick=()=>{if(!u||!l)return;A=null;const a=v.position.clone().sub(u.target),s=pe.clamp(a.length()*e,u.minDistance,u.maxDistance);v.position.copy(u.target).add(a.setLength(s)),u.update(),k=!0};function Ae(){const t=K;K=be(he,H),z?.setTexture(K);for(const e of te.values())e.paper.setTexture(K),e.dirty=!0;t.dispose(),document.documentElement.style.setProperty("--control-accent",new we(H).getHSL({}).l>.5?"#b74626":H),document.querySelectorAll("[data-color]").forEach(e=>e.setAttribute("aria-pressed",String(e.dataset.color===H))),document.querySelectorAll("[data-pattern]").forEach(e=>{e.setAttribute("aria-pressed",String(e.dataset.pattern===he));const a=be(e.dataset.pattern,H);e.querySelector(".pattern-preview").style.backgroundImage=`url(${a.image.toDataURL()})`,a.dispose()}),k=!0}document.querySelectorAll("[data-color]").forEach(t=>t.onclick=()=>{H=t.dataset.color,Ae()});document.querySelectorAll("[data-pattern]").forEach(t=>t.onclick=()=>{he=t.dataset.pattern,Ae()});function Xe(){document.querySelectorAll(".animal-card").forEach(t=>{const e=t.dataset.animal===De;t.classList.toggle("selected",e),t.querySelector(".animal-name").setAttribute("aria-pressed",String(e)),t.querySelector(".deselect").hidden=!e})}let Ye=ie.find(t=>t.animals.includes(_e)).number;function Oe(t){const e=ie.find(a=>a.number===t);if(e?.animals.length){Ye=t,n("levelTitle").textContent=`Level ${t} — ${e.title}`,n("sourceCredit").textContent=t===1?"Crane: adapted from Origami Odyssey · Robb Doering.":"Scorpion: simplified model · inspired by Donya Quick.";for(const a of n("animals").children)a.hidden=Number(a.dataset.level)!==t;for(const a of n("levels").children)a.setAttribute("aria-pressed",String(Number(a.dataset.level)===t));for(const a of te.values())a.dirty=!0}}function Wt(){for(const t of ie){const e=document.createElement("button");e.dataset.level=t.number,e.disabled=!t.animals.length,e.disabled&&(e.title="Lessons being rebuilt",e.setAttribute("aria-label",`Level ${t.number} — lessons being rebuilt`)),e.textContent=`Level ${t.number}`,e.onclick=()=>Oe(t.number),n("levels").append(e)}for(const t of Ee){const e=ie.find(i=>i.animals.includes(t)).number,a=document.createElement("article");a.className="animal-card",a.dataset.animal=t,a.dataset.level=e;const s=document.createElement("button");s.className="animal-name",s.textContent=t,t==="Turtle"&&(s.title="Simple turtle profile"),s.onclick=()=>J(t);const r=document.createElement("button");if(r.className="deselect",r.innerHTML=fe.x,r.setAttribute("aria-label",`Deselect ${t}`),r.onclick=()=>J(null),Ce[t]){const i=document.createElement("div");i.className="native-pending",i.textContent="3D in development",a.append(i)}else{const i=document.createElement("canvas");i.setAttribute("aria-label",`${t} finished model. Drag to rotate. Click to select.`),i.tabIndex=0;let o,c=!1;i.addEventListener("pointerdown",p=>{o=[p.clientX,p.clientY],c=!1}),i.addEventListener("pointermove",p=>{o&&Math.hypot(p.clientX-o[0],p.clientY-o[1])>5&&(c=!0)}),i.addEventListener("pointerup",()=>{o&&!c&&J(t,"study"),o=null}),i.addEventListener("pointercancel",()=>o=null),i.addEventListener("keydown",p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),J(t,"study"))}),a.append(i)}if(a.append(s,r),t==="Dragonfly"){const i=document.createElement("span");i.className="lesson-badge",i.textContent="Cut & fold",a.append(i)}n("animals").append(a)}Xe(),Oe(Ye)}let ve=!1,Be;async function Xt(){if(!ve){ve=!0;for(const t of Ee.filter(e=>!Ce[e]))if(!te.has(t))try{const e=await We(t),a=document.querySelector(`[data-animal="${t}"] canvas`),s=Be||(Be=new Ie({canvas:document.createElement("canvas"),alpha:!0,antialias:!0,preserveDrawingBuffer:!0}));s.setPixelRatio(Math.min(devicePixelRatio||1,1.5));const r=new Ue,i=new $e(36,1,.1,30),o=new qe(e,K),c=o.update(ye(e,e.frames.length-1,1));r.add(o),Ve(r);const p=new yt().setFromObject(o),y=p.getSize(new T).length();i.position.copy(c).add(new T(e.cuts?.6:t.startsWith("Dinosaur")?.55:.48,e.cuts?-.6:t.startsWith("Dinosaur")?.25:.3,1).normalize().multiplyScalar(Math.max(1,y*1.55)));const b=new He(i,a);b.target.copy(c),b.enablePan=!1,b.enableZoom=!1,b.update();const P={renderer:s,scene:r,camera:i,paper:o,controls:b,canvas:a,context:a.getContext("2d"),dirty:!0};b.addEventListener("change",()=>P.dirty=!0),te.set(t,P),new ResizeObserver(()=>P.dirty=!0).observe(a)}catch(e){console.warn(`Preview unavailable: ${t}`,e),document.querySelector(`[data-animal="${t}"] canvas`).setAttribute("aria-label",`${t} preview unavailable. Click to select.`)}ve=!1}}document.addEventListener("panel-open",t=>{if(A=null,d=!1,h=!1,w=!1,E(),t.detail==="models"){Xt();for(const e of te.values())e.dirty=!0}});function Ke(t){const e=ge?Math.min((t-ge)/1e3,.05):0;if(ge=t,l&&!document.hidden){if(d&&!(A?.prepare&&f===0)){const a=l.motions?.[m],s=a?.type==="foundation"?l.foundation.motions[a.step]:a,r=s?.type==="cut"?12:s?.type==="panel-tree"||(s?.curve?.length||0)>1?7.2:5.6;f=Math.min(1,f+e*(w?3:ee)/r),f===1&&(d=!1),N(),f===1&&(w||h)?Me():E()}if(A){const a=A;a.elapsed=Math.min(1,a.elapsed+e/a.duration);const s=a.elapsed,r=s*s*s*(s*(s*6-15)+10),i=pe.lerp(a.from.length(),a.to.length(),r),o=a.from.clone().normalize(),c=a.to.clone().normalize(),p=new Te().setFromUnitVectors(o,c),y=o.applyQuaternion(new Te().slerp(p,r)).multiplyScalar(i);v.position.copy(u.target).add(y),u.update(),k=!0,a.elapsed===1&&(A=null)}}if(_&&k&&(Y.render(),k=!1),n("appDialog").open&&!n("panel-models").hidden){for(const a of te.values())if(a.dirty){const s=a.canvas.getBoundingClientRect();if(s.width&&s.height){a.renderer.setSize(s.width,s.height,!1),a.camera.aspect=s.width/s.height,a.camera.updateProjectionMatrix(),a.renderer.render(a.scene,a.camera);const r=a.renderer.domElement;(a.canvas.width!==r.width||a.canvas.height!==r.height)&&(a.canvas.width=r.width,a.canvas.height=r.height),a.context.clearRect(0,0,a.canvas.width,a.canvas.height),a.context.drawImage(r,0,0),a.dirty=!1}}}requestAnimationFrame(Ke)}Wt();Ae();E();J(_e);requestAnimationFrame(Ke);if(document.modelContext?.registerTool)try{Promise.resolve(document.modelContext.registerTool({name:"show_origami_step",description:"Show a paused folding step for the currently selected animal.",inputSchema:{type:"object",properties:{step:{type:"integer",minimum:1},progress:{type:"number",minimum:0,maximum:1}},required:["step","progress"],additionalProperties:!1},annotations:{readOnlyHint:!1},execute(t){if(!l||!t||!Number.isInteger(t.step)||t.step<1||t.step>l.frames.length||!Number.isFinite(t.progress)||t.progress<0||t.progress>1)throw Error("Invalid step or progress");return m=t.step-1,f=t.progress,d=!1,h=!1,w=!1,N(),E(),{step:m+1,progress:f,playing:d}}})).catch(console.error)}catch(t){console.error(t)}
