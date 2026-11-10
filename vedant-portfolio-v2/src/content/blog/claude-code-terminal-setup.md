I use Claude for a bit of everything, day job included, and I usually run it in the terminal. It’s light and minimal, but out of the box it can feel a bit _beige_.

So I dressed it up, and I'm writing this as a *_non-opinionated_ guide to the tools I like using to have a better experience on the terminal.

*_non-opinionated as in that every tool works on its own, so steal whatever you like!_

* One rule: every tool changes what’s around Claude, not how it works. Two of them bend it a little, and I’ll call those out.


## 1. prismantis: make the replies pretty

[prismantis](https://github.com/NahumLitvin/prismantis) redraws Claude's replies right in the terminal. Markdown tables become proper box tables, Mermaid code shows up as real charts, and more!

Here I asked Claude to turn my morning routine into a table and a pie chart:

![A prismantis reply with a box table and a pie chart](prismantis-reply)

Deep work gets the biggest slice. (Let's call that aspirational, eh? *shhh....*)

Install it then run `/prismantis setup`. It shows drawn previews of every theme and style, so you're not picking blind from a list of names.

> **Heads-up:** Behind the scenes, prismantis adds about 630 tokens to every prompt (`diagramHints`) to tell Claude that charts will render here. That's why Claude suddenly gets into pie charts. It's also rule-bender number one, since it changes what Claude writes. I keep it on as for me, pictures beat paragraphs. If you'd rather save the tokens, set `diagramHints` to `false`.

### Bonus: diagram-design

`prismantis` is for the quick sketch mid-conversation. For a diagram I want to publish, I use [diagram-design](https://github.com/cathrynlavery/diagram-design). It writes one HTML file with an SVG inside, and you open it in a browser (for the fellow visual learners)!


## 2. Ghostty: where the pie chart gets its curves

`prismantis` works in any terminal, since most of what it draws is colored text. The pie chart is the diva -- so for it to work correctly, you might just have to ditch your native terminal.

I've found [Ghostty](https://ghostty.org) to be the most flexible and snappy-fast terminal emulator -- and unless you are for-real-real `iTerm2` poweruser, I HIGHLY recommend you to try it out

In Ghostty or kitty prismantis draws a smooth image. Everywhere else, tmux included, it's a circle made of text characters, which is cute but can lack richness (unless you live in Minecraft :p).

A SOLID catch tho -

- On macOS, the config doesn't live in `~/.config`. It's at `~/Library/Application Support/com.mitchellh.ghostty/config.ghostty`. Custom themes, meanwhile, go in `~/.config/ghostty/themes/`. Two folders for one terminal. Thanks, macOS @_@
- With `copy-on-select` on, clicking a prismantis copy button can select the word "copy" instead (the prismantis README warns about this x_x)


## 3. ccstatusline: the dashboard

Claude has a status line at the bottom of the screen, and [ccstatusline](https://github.com/sirmalloc/ccstatusline) turns it into a dashboard:

![My two-line status line](statusline)

Here's the widget order, if you want to copy it:

```plaintext
line 1: model, thinking-effort, git-branch, git-changes, sandbox-status, jj-root-dir
line 2: tokens-cached, tokens-output, tokens-input, cache-hit-rate, context-bar, free-memory
```

The context bar is my fuel gauge. When it fills up, Claude compacts the chat, so it tells me when to wrap up or start fresh. Cache hit rate is how much of the input comes from the prompt cache, which is cheaper and faster. Higher is better. It was 98.7% in that screenshot(, bragging right eh?).

The memory widget keeps me honest about the whole "lightweight" thing. And `SB: ○` and `no jj` are the sandbox and jj widgets, which only light up if you use Claude's sandbox or the jj version control tool.

> **Tip:** Run `npx -y ccstatusline@latest`, pick your widgets in its TUI, and choose "Pinned global install". The status line refreshes every 10 seconds, and pinning means it runs the installed `ccstatusline` each time instead of going through npx.



## 4. anotifier: stop leaving Claude on read

Ever left a session hanging for dead while using the terminal?

[anotifier](https://github.com/DevinoSolutions/anotifier-for-claude-codex-cursor) fixes that with two hooks: `Notification` when Claude needs me, and `Stop` when it's done. Both send a macOS notification and ring the terminal bell, each with its own sound:

```json
"task_complete": { "toastSound": "IM" },
"needs_input":   { "toastSound": "Reminder", "priority": "urgent" }
```

So I can tell "done" from "needs me" without looking up. The notification also shows what Claude said, so I can decide whether it's worth switching windows.


![An anotifier notification on macOS](toast)
_Yes, I sent myself a test notification just to screenshot it :)_

It also warns me before I hit a limit:

```json
"usageAlerts":   { "enabled": true, "thresholds": [70, 85, 95] },
"contextAlerts": { "enabled": true, "threshold": 85 }
```

Usage alerts cover the 5-hour and weekly limits (Pro or higher plans only). The context alert fires once a chat gets close to auto-compacting.


## 5. caveman: shorter replies

The second rule-bender. [caveman](https://github.com/JuliusBrussee/caveman) makes Claude talk like a caveman: short replies, no pleasantries, and code and paths still exact. In its own words "why many token when few do trick."

It pairs amazingly with anotifier!

> **Tip:** Treat it like a toggle. `/caveman off` (or say "stop caveman") when you want the long version, and `/caveman` to bring it back.

The README is upfront about the numbers: regular `/caveman` saves only a few percent more output than telling Claude "be concise", and its rules cost about 1,160 input tokens. `/ultracave` cuts a lot more. I use it to read less, so the small savings don't bother me.


## So.. That's it, that's the setup

Thank you for reading until the end. I'm always learning and exploring so I'd love to hear your thoughts or if you have any of your own personal recipes that I should be trying out!

Until next time..
