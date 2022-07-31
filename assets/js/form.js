const SF_HTTPDEV_HOST = "www.softensistemas.com.br"; const SF_HTTPDEV_PREFIX = "/form"; const SF_HTTPDEV_PROTOCOL = "https"; const mock_styles = "#rf_slug_uui_here form{display:flex;flex-direction:column}#rf_slug_uui_here form div{display:flex;flex-direction:column;margin-bottom:10px}#rf_slug_uui_here form div label{color:#969696;display:inline-block;font-family:'Open Sans',sans-serif;font-size:15px;font-style:normal;font-weight:400;margin-bottom:.4em}#rf_slug_uui_here form div input{height:37px;padding:0 .5em;font-size:14px;font-family:'Open Sans',sans-serif!important;border:solid;border-width:1.5px;border-radius:13px;border-color:#c8c8c8;outline:0;color:#555;background-color:#fff}#rf_slug_uui_here form div select{height:40px;padding:0 .5em;font-size:14px;font-family:'Open Sans',sans-serif!important;border:solid;border-width:1.5px;border-radius:13px;border-color:#c8c8c8;outline:0;color:#555;background-color:#fff}#rf_slug_uui_here form button{height:55px;width:100%;align-self:center;font-size:2em;font-weight:700;border-color:#fd0b57;border-radius:10px;cursor:pointer;margin-top:20px;max-width:calc(100% - 20%);color:#fff;background-color:#fd0b57;transition:all 1s}#rf_slug_uui_here form button:hover{background-color:#fd2367;max-width:calc(100% - 25%)}"; const QUERY_ATRIBUTE = "div[softenforms][id]"; function saveParametersToStorage() { let e = new URLSearchParams(window.location.search); for (var t of e.keys()) { if (e.get(t) != null && e.get(t) != "") { window.localStorage.setItem(`sf_${t}`, e.get(t)) } } } function validateField(e, t) { let r = e; switch (t) { case "first_name": let e = /^(?:((([^0-9_!Â¡?Ã·?Â¿/\\+=@#$%Ë†&*(){}|~<>;:[\]'â€™,\-.\s])){1,}(['â€™,\-\.]){0,1}){2,}(([^0-9_!Â¡?Ã·?Â¿/\\+=@#$%Ë†&*(){}|~<>;:[\]'â€™,\-. ]))*(([ ]+){0,1}(((([^0-9_!Â¡?Ã·?Â¿/\\+=@#$%Ë†&*(){}|~<>;:[\]'â€™,\-\.\s])){1,})(['â€™\-,\.]){0,1}){2,}((([^0-9_!Â¡?Ã·?Â¿/\\+=@#$%Ë†&*(){}|~<>;:[\]'â€™,\-\.\s])){2,})?)*)$/; let t = /^[a-zA-ZÃ -ÃºÃ€-Ãš0-9]+( [a-zA-ZÃ -ÃºÃ€-Ãš0-9]+)+$/; r.onblur = () => { let t = document.querySelector(`#sfle_${r.id}`); let i = ""; r.value.trim().split(" ").forEach((e => e.length >= 1 ? i += ` ${e}` : null)); i = i.trim(); if (r.required && i == "") return t.innerText = "Este campo Ã© obrigatÃ³rio!"; if (r.required && !e.test(i)) return t.innerText = "Este campo nÃ£o aceita abreviaÃ§Ãµes!"; return t.innerText = "" }; r = r; break; case "email": let i = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; r.onblur = () => { let e = document.querySelector(`#sfle_${r.id}`); let t = r.value.trim(); if (r.required && t == "") return e.innerText = "Este campo Ã© obrigatÃ³rio!"; if (r.required && !i.test(t)) return e.innerText = "Campo e-mail estÃ¡ invÃ¡lido!"; return e.innerText = "" }; r = r; break; case "cellphone": case "telephone": let n = /(?:^[0]?[1-9]{2}[\.-\s]?)[9]?[1-9]\d{3}[\.-\s]?\d{4}$/; r.onkeyup = () => phoneMask(r.id); r.onblur = () => { phoneMask(r.id); let e = document.querySelector(`#sfle_${r.id}`); let t = r.value.trim().replace(/\D/g, ""); if (r.required && t == "") return e.innerText = "Este campo Ã© obrigatÃ³rio!"; if (r.required && !n.test(t)) return e.innerText = "Campo de contato estÃ¡ invÃ¡lido!"; return e.innerText = "" }; r = r; break; default: r = r; break }return r } class Http4Dev { constructor(e = SF_HTTPDEV_PROTOCOL, t = SF_HTTPDEV_HOST) { this.protocol = e; this.host = t } get(e) { let t = new XMLHttpRequest; let r = new URL(`${SF_HTTPDEV_PREFIX + e}`, `${this.protocol}://${this.host}`); t.open("GET", r); t.send(null); return t } post(e, t) { let r = new XMLHttpRequest; let i = new URL(`${SF_HTTPDEV_PREFIX + e}`, `${this.protocol}://${this.host}`); r.open("POST", i); r.setRequestHeader("Content-Type", "application/json"); r.send(t); return r } } class BuildElement { constructor(e) { this.element = document.createElement(e) } render() { return this.element } innerText(e) { this.element.innerText = e; return this } setAttribute(e, t, r = null) { if (r) { r.forEach(((e, t) => { this.element.setAttribute(e.key, e.value) })); return this } this.element.setAttribute(e, t); return this } setMultipleAttributes(e) { e.forEach((e => this.element.setAttribute(e.key, e.value))); return this } } class FormRequest { constructor(e, t) { this.slugUuid = e; this.fields = t; this.device = { userAgent: navigator.userAgent, ip: "" }; this.body = JSON.stringify({ slugUuid: this.slugUuid, fields: this.fields, device: this.device }); let r = new Http4Dev; let i = r.post(`/conversions`, this.body); this.createFormEvents(i) } createFormEvents(e) { e.addEventListener("load", this.transferComplete, false); e.addEventListener("error", this.transferFailed, false); e.addEventListener("abort", this.transferCanceled, false) } updateProgress = e => { }; transferComplete = e => { let t = JSON.parse(e.target.response); let r = t.redirectUlr; if (r && r !== "") return window.location.href = r; return null }; transferFailed = e => { console.error("FormEvent >> transferFailed", e) }; transferCanceled = e => { console.error("FormEvent >> transferCanceled", e) } } class Form { constructor(e, t) { this.parent = t; this.form = e; this.formModel = []; this.renderForm() } renderForm() { let e = `rf_${this.form.slug}-${this.form.uuid}`; let t = new BuildElement("div").setAttribute("id", e).render(); let r = this.createForm(); this.createFormStyleSheet(); Object.keys(document.styleSheets).forEach((e => { let t = document.styleSheets[e]["ownerNode"]; if (t.id === `cfss_${this.form.slug}-${this.form.uuid}`) { let e = document.querySelector(`style[id="cfss_${this.form.slug}-${this.form.uuid}"]`); e.innerText = mock_styles.replaceAll("#rf_slug_uui_here", `#rf_${this.form.slug}-${this.form.uuid}`) } })); setTimeout((() => { this.parent.innerHTML = ""; this.createEventListener(r); t.appendChild(r); this.parent.appendChild(t); document.body.dispatchEvent(new Event(`formLoad_${this.parent.id}`)) }), 1e3) } createFormStyleSheet() { let e = `cfss_${this.form.slug}-${this.form.uuid}`; let t = document.querySelector(`head style[id="${e}"]`); if (t) return console.error("cfss_form jÃ¡ encontrado!"); t = new BuildElement("style").render(); t.setAttribute("id", e); document.head.appendChild(t) } createEventListener(e) { e.addEventListener("submit", (e => { e.preventDefault(); let t = `${this.form.slug}@${this.form.uuid}`; let r = []; this.formModel.forEach((e => { let t = this.parent.querySelector(`form [name='${e.inputUuid}']`); r.push({ field: e.inputUuid, value: t.value }) })); new FormRequest(t, r) }), false) } createForm() { let e = new BuildElement("form").render(); let t = new BuildElement("button").innerText(this.form.button).render(); this.form.fields.forEach(((t, r) => { let i = t.field; let n = null; this.formModel.push({ inputUuid: i.uuid }); switch (i.element) { case "UTM_SOURCE": case "UTM_MEDIUM": case "UTM_CAMPAIGN": case "GCLID": n = this.createParamsInput(i); break; case "SF_URL_LOCATION": n = this.createUrlInput(i); break; case "SF_FORM_SLUG": n = this.createSlugInput(i); break; case "SF_FORM_UUID": n = this.createUuidInput(i); break; case "INPUT": n = this.createInput(i); break; case "SELECT": n = this.createSelect(i); break; case "DATALIST": n = this.createDatalist(i); break; case "TEXTAREA": n = this.createTextarea(i); break; default: n = new BuildElement("div").innerText("!OCORREU UM ERRO!").render(); break }e.appendChild(n) })); e.appendChild(t); return e } createParamsInput(e) { let t = new URLSearchParams(window.location.search); const r = e => { let r = t.get(e.toLowerCase()); if (r == null) r = window.localStorage.getItem(`sf_${e.toLowerCase()}`); return r ? r : "" }; let i = new BuildElement("input").setAttribute("name", e.uuid).setAttribute("type", e.type).setAttribute("required", "").setAttribute("disabled", "").setAttribute("value", r(e.element)).render(); return i } createUrlInput(e) { const t = () => { let e = window.location.origin + window.location.pathname; return e ? e : "" }; let r = new BuildElement("input").setAttribute("name", e.uuid).setAttribute("type", e.type).setAttribute("required", "").setAttribute("disabled", "").setAttribute("value", t()).render(); return r } createSlugInput(e) { let t = new BuildElement("input").setAttribute("name", e.uuid).setAttribute("type", e.type).setAttribute("required", "").setAttribute("disabled", "").setAttribute("value", this.form.slug).render(); return t } createUuidInput(e) { let t = new BuildElement("input").setAttribute("name", e.uuid).setAttribute("type", e.type).setAttribute("required", "").setAttribute("disabled", "").setAttribute("value", this.form.uuid).render(); return t } createInput(e) { let t = new BuildElement("div").render(); let r = new BuildElement("label").setAttribute("for", e.uuid).innerText(e.title).render(); let i = new BuildElement("input").setAttribute("id", e.uuid).setAttribute("name", e.uuid).setAttribute("type", e.type).render(); let n = new BuildElement("label").setAttribute("id", `sfle_${e.uuid}`).render(); n.style.setProperty("margin", "0", "important"); n.style.setProperty("height", "0.8em", "important"); n.style.setProperty("margin-top", "0.1em", "important"); n.style.setProperty("font-size", "1.3em"); n.style.setProperty("color", "#FA6B6B", "important"); if (!e.viewSubtitle) { r.style.display = "none"; i.setAttribute("placeholder", e.title); if (e.required) i.placeholder += " *" } if (e.required) { r.innerText += " *"; i.setAttribute("required", "") } t.appendChild(r); t.appendChild(i); t.appendChild(n); validateField(i, e.reevType); return t } createSelect(e) { let t = new BuildElement("div").render(); let r = new BuildElement("label").setAttribute("for", e.uuid).innerText(e.title).render(); let i; let n = new BuildElement("select").setAttribute("id", e.uuid).setAttribute("name", e.uuid).render(); if (!e.viewSubtitle) { r.style.display = "none"; i = new BuildElement("option").innerText(r.innerText).setAttribute("disabled", "").setAttribute("selected", "").setAttribute("hidden", "").render(); if (e.required) i.innerText += " *" } if (e.required) { r.innerText += " *"; n.setAttribute("required", "") } let l = new BuildElement("option").setAttribute("selected", "").setAttribute("value", "").setAttribute("hidden", "").innerText("Selecione").render(); n.appendChild(l); e.options.forEach((e => { let t = new BuildElement("option").setAttribute("value", e.value).innerText(e.title).render(); if (e.selected) t.setAttribute("selected", ""); n.appendChild(t) })); if (!e.viewSubtitle) n.appendChild(i); t.appendChild(r); t.appendChild(n); return t } createDatalist(e) { let t = new BuildElement("div").render(); let r = new BuildElement("label").setAttribute("for", `datalist_${e.uuid}`).innerText(e.title).render(); let i = new BuildElement("input").setAttribute("id", `datalist_${e.uuid}`).setAttribute("name", e.uuid).setAttribute("list", e.uuid).render(); let n = new BuildElement("datalist").setAttribute("id", e.uuid).render(); if (!e.viewSubtitle) { r.style.display = "none"; i.placeholder = e.title; if (e.required) i.placeholder += " *" } if (e.required) { r.innerText += " *"; i.setAttribute("required", "") } e.options.forEach((e => { let t = new BuildElement("option").setAttribute("value", e.value).innerText(e.description).render(); n.appendChild(t) })); t.appendChild(r); t.appendChild(i); t.appendChild(n); return t } createTextarea(e) { let t = new BuildElement("div").render(); let r = new BuildElement("label").setAttribute("for", `${e.element}_${e.uuid}`).innerText(e.title).render(); let i = new BuildElement("textarea").setAttribute("id", `${e.element}_${e.uuid}`).setAttribute("name", e.uuid).setAttribute("type", e.type).render(); t.appendChild(r); t.appendChild(i); return t } } class FormBuilder { constructor(e) { this.element = e; this.slug_uuid = e.id.split("@"); if (!this.slug_uuid[0]) return console.error(`softenforms: slug is required`); if (!this.slug_uuid[1]) return console.error(`softenforms: uuid is required`); this.getForm() } getForm() { let e = new Http4Dev; let t = e.get(`/conversion/forms/${this.element.id}`); this.createFormEvents(t) } createFormEvents(e) { e.addEventListener("progress", this.updateProgress, false); e.addEventListener("load", this.transferComplete, false); e.addEventListener("error", this.transferFailed, false); e.addEventListener("abort", this.transferCanceled, false) } updateProgress = e => { }; transferComplete = e => { let t = JSON.parse(e.target.response); let r = this.element; if (t.code && t.title && t.description) { return console.error(`softenforms: ${t.description}`) } new Form(t, r) }; transferFailed = e => { console.error("FormElement >> transferFailed", e) }; transferCanceled = e => { console.error("FormElement >> transferCanceled", e) } } class FormUtils { constructor(e, t) { this.element = e; this.util = t; this.util.forEach((e => { switch (e) { case "sfloading": this.formLoading(); break; default: break } })) } formLoading = () => { let e = this.element.getAttribute("sfloading").split(" "); let t = this.element.getAttribute("sfRows") || 3; let r = parseInt(this.element.getAttribute("sfDuration")) || 2e3; let i = this.element.getAttribute("sfWidth") || "100%"; let n = this.element.getAttribute("sfHeight") || "35px"; let l = this.element.getAttribute("sfRadius") || "15px"; let s = this.element.getAttribute("sfColor") || "#C4C4C4"; let o = this.element.getAttribute("sfMarginTop") || "10px"; let a = this.element.getAttribute("btnWidth") || "50%"; let u = this.element.getAttribute("btnHeight") || "30px"; let d = this.element.getAttribute("btnColor") || "#A4A4A4"; let c = this.element.getAttribute("btnAlign") || "center"; let h = this.element.getAttribute("MarginTop") || "15px"; let m = this.element.getAttribute("marginBottom") || "0px"; let p = new BuildElement("div").render(); p.style.display = "flex"; p.style.flexDirection = "column"; let f = new BuildElement("div").render(); let b = new BuildElement("div").render(); b.style.width = a; b.style.height = u; b.style.display = "block"; b.style.background = `linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0)), ${d}`; b.style.backgroundRepeat = "repeat-y"; b.style.backgroundSize = "40% 100%"; b.style.backgroundPosition = "0 0"; b.style.marginTop = h; b.style.marginBottom = m; b.style.alignSelf = c; b.animate([{ backgroundPosition: "-75% 0" }, { backgroundPosition: "175% 0" }], { duration: r, iterations: Infinity }); switch (e[0]) { case "brightLine": for (let e = 0; e < t; e++) { let e = new BuildElement("div").render(); e.style.width = i; e.style.height = n; e.style.borderRadius = l; e.style.display = "block"; e.style.background = `linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0)), ${s}`; e.style.backgroundRepeat = "repeat-y"; e.style.backgroundSize = "40% 100%"; e.style.backgroundPosition = "0 0"; e.style.marginTop = o; e.animate([{ backgroundPosition: "-75% 0" }, { backgroundPosition: "175% 0" }], { duration: r, iterations: Infinity }); f.appendChild(e) } break; default: break }p.appendChild(f); p.appendChild(b); this.element.appendChild(p) } } class TawkConversion { constructor() { this.tawkModel; this.tawkForm = []; this.startTawkConversion() } startTawkConversion() { let e = new Http4Dev; let t = e.get(`/conversions/tawk`); this.createFormEvents(t) } createFormEvents(e) { e.addEventListener("load", this.transferComplete, false); e.addEventListener("error", this.transferFailed, false) } transferComplete = e => { let t = JSON.parse(e.target.response); if (t.code && t.title && t.description) { return console.error(`softenforms: ${t.description}`) } this.tawkModel = t }; transferFailed = e => { console.error("TawkConversion >> transferFailed", e) }; createTawkForm = (e, t) => { this.tawkModel.forEach(((r, i) => { switch (r.fieldType) { case "UTM_SOURCE": case "UTM_MEDIUM": case "UTM_CAMPAIGN": case "GCLID": let i = new URLSearchParams(window.location.search).get(r.fieldType.toLowerCase()); if (i == null) i = window.localStorage.getItem(`sf_${r.fieldType.toLowerCase()}`); if (i !== null) return this.tawkForm.push({ uuid: r.uuid, value: i }); return null; case "SF_URL_LOCATION": let n = window.location.origin + window.location.pathname; return this.tawkForm.push({ uuid: r.uuid, value: n ? n : "" }); case "TAWK_TYPE": return this.tawkForm.push({ uuid: r.uuid, value: e }); case "TAWK_INPUT": return t.forEach((e => e.label === r.tawkField ? this.tawkForm.push({ uuid: r.uuid, value: e.answer }) : null)); default: return null } })); console.log("\n"); console.log(this.tawkForm) }; onPrechatSubmit = e => { this.createTawkForm("chat online", e) }; onOfflineSubmit = e => { this.createTawkForm("chat offline", e) }; onAgentJoinChat = e => { console.log("TawkConversion --\x3e onAgentJoinChat", e) }; onAgentLeaveChat = e => { console.log("TawkConversion --\x3e onAgentLeaveChat", e) }; sendTawkContact = () => { } } function phoneMask(e) { var t = document.getElementById(e); var r = t.value.replace(/\D/g, ""); r = r.replace(/^0/, ""); if (r.length > 10) { r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3"); t.blur() } else if (r.length > 5) { if (r.length == 6) { return } r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3") } else if (r.length > 2) { r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2") } else { if (r.length != 0) { r = r.replace(/^(\d*)/, "($1") } } t.value = r } (() => { let e = document.querySelectorAll(QUERY_ATRIBUTE); e.forEach((e => { saveParametersToStorage(); new FormUtils(e, e.getAttributeNames()); new FormBuilder(e) })) })();