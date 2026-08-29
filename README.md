<div align="center">

# Mettle

Probe how you reason under pressure. Earn a maturity rank from the depth of your thinking, not the answer you pick.

[![Live][badge-site]][url-site]
[![HTML5][badge-html]][url-html]
[![CSS3][badge-css]][url-css]
[![JavaScript][badge-js]][url-js]
[![Claude Code][badge-claude]][url-claude]
[![License][badge-license]](LICENSE)

[badge-site]:    https://img.shields.io/badge/live_site-f59e0b?style=for-the-badge&logo=googlechrome&logoColor=white
[badge-html]:    https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white
[badge-css]:     https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white
[badge-js]:      https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[badge-claude]:  https://img.shields.io/badge/Claude_Code-CC785C?style=for-the-badge&logo=anthropic&logoColor=white
[badge-license]: https://img.shields.io/badge/license-MIT-404040?style=for-the-badge

[url-site]:   https://mettle.neorgon.com/
[url-html]:   #
[url-css]:    #
[url-js]:     #
[url-claude]: https://claude.ai/code

</div>

---

Mettle is a reasoning maturity probe. You pick a theme anchored on failure and recovery, then answer a short chain of questions that drill into the *why behind the why*. It scores the **depth of your reasoning**. The rung you reason from, rather than the answer you think is correct. The same final answer reads differently at each rung: "because I was told" is not "everything fails if you don't maintain the system."

The core idea: maturity shows in how you metabolize a loss, not in how you narrate a win. So the probe is built to be hard to fake. It cross-checks your recovery against your root reasoning, and rewards calibrated uncertainty over performed certainty. Your results chart across five virtues and roll up into a maturity rank, from Dormant to Sovereign.

**Everything runs locally. Your answers never leave your device.**

---

## Usage

No install or build step required.

```bash
make serve
# open http://localhost:8847
```

Or `python3 -m http.server 8847` from this directory. ES modules require an HTTP server, not `file://`.

---

## How it works

### The probe chain

Each theme expands into 3-5 **rungs** anchored on failure and recovery, not success:

- **Trigger**: recall the moment (the shame, the mistake, the silence).
- **Recovery**: how would you exit it more gracefully now?
- **Durability**: would you fall to it again, and why?
- **Root**: what has to be true about you for that answer to hold?
- **Transfer**: where else does that same root show up?

The runner is forward-only: once a rung is submitted you cannot edit it, which keeps you from reverse-engineering the scoring.

### The scoring

Each answer is classified into a reasoning rung (0-4) by a heuristic, fully-offline rubric:

| Rung | Reads as |
|---|---|
| 0 External | Borrowed authority: "because I was told" |
| 1 Surface | Received wisdom: "it's good for you" |
| 2 Causal | Cause and effect with named tradeoffs |
| 3 Systemic | Second-order effects, self-owned model |
| 4 Integrated | Principle transfers across domains, uncertainty held openly |

Two anti-fake mechanics adjust the raw score:

- **Consistency cross-check**: a polished recovery backed by a shallow root reads as *performed* and is penalized.
- **Calibration**: high confidence with thin reasoning is overconfidence (penalty); calibrated humility earns a small bonus.

### The profile

Scores roll up into five virtue axes: **Courage, Wisdom, Tolerance, Eloquence, Imagination**, shown as a radar chart, and an overall **maturity rank**: Dormant → Awakening → Adept → Realized → Sovereign.

Toggle **Rehearsal mode** to retake a theme and watch the score move as you practice a more dignified exit.

---

## Architecture

```
mettle-site/
├── index.html          # App shell, SEO head, JSON-LD
├── css/
│   └── style.css        # Neorgon design tokens + Mettle styles
├── js/
│   ├── app.js          # Entry point — wires modules together
│   ├── state.js        # Shared state + localStorage (mettle-mapper-v1)
│   ├── data.js         # Virtues, ranks, theme library, rubric markers
│   ├── scorer.js       # The anti-fake engine: rung classification, consistency, calibration
│   ├── render.js       # Three views: compass, probe runner, result
│   ├── events.js       # Interaction handlers (forward-only probe)
│   └── utils.js        # Helpers: radar SVG, toast, escape, download
├── Makefile            # make serve / make kill (port 8847)
├── robots.txt
├── sitemap.xml
└── CNAME               # mettle.neorgon.com
```

State autosaves to `localStorage` under `mettle-mapper-v1`. No backend, no accounts, no network calls.

<div align="center">

Part of [Neorgon](https://neorgon.com/)

</div>
