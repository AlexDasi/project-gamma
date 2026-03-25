(function () {
  'use strict';

  const STORAGE_KEY = 'fluid-bg-controls:v1';
  const ROOT_ID = 'bg-controls';

  const defaults = {
    DENSITY_DISSIPATION: 1.5,
    VELOCITY_DISSIPATION: 0.9,
    PRESSURE_ITERATIONS: 30,
    CURL: 3,
    SPLAT_RADIUS: 0.25,
    SPLAT_FORCE: 6000,
    EFFECT_OPACITY: 1,
    SHADING: true,
    BLOOM: false,
    EFFECT_COLOR: { r: 236, g: 249, b: 142 }
  };

  const presets = {
    soft: {
      DENSITY_DISSIPATION: 1.9,
      VELOCITY_DISSIPATION: 1.0,
      PRESSURE_ITERATIONS: 24,
      CURL: 2,
      SPLAT_RADIUS: 0.22,
      SPLAT_FORCE: 4200,
      EFFECT_OPACITY: 0.85,
      SHADING: true,
      BLOOM: false,
      EFFECT_COLOR: { r: 176, g: 214, b: 148 }
    },
    medium: {
      DENSITY_DISSIPATION: 1.5,
      VELOCITY_DISSIPATION: 0.9,
      PRESSURE_ITERATIONS: 30,
      CURL: 3,
      SPLAT_RADIUS: 0.25,
      SPLAT_FORCE: 6000,
      EFFECT_OPACITY: 1,
      SHADING: true,
      BLOOM: false,
      EFFECT_COLOR: { r: 236, g: 249, b: 142 }
    },
    intense: {
      DENSITY_DISSIPATION: 1.2,
      VELOCITY_DISSIPATION: 0.7,
      PRESSURE_ITERATIONS: 36,
      CURL: 6,
      SPLAT_RADIUS: 0.32,
      SPLAT_FORCE: 9000,
      EFFECT_OPACITY: 1,
      SHADING: true,
      BLOOM: true,
      EFFECT_COLOR: { r: 255, g: 140, b: 110 }
    }
  };

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function rgbToHex(rgb) {
    const r = clamp(Math.round(rgb.r), 0, 255).toString(16).padStart(2, '0');
    const g = clamp(Math.round(rgb.g), 0, 255).toString(16).padStart(2, '0');
    const b = clamp(Math.round(rgb.b), 0, 255).toString(16).padStart(2, '0');
    return '#' + r + g + b;
  }

  function hexToRgb(hex) {
    const clean = hex.replace('#', '');
    if (clean.length !== 6) return null;

    return {
      r: parseInt(clean.slice(0, 2), 16),
      g: parseInt(clean.slice(2, 4), 16),
      b: parseInt(clean.slice(4, 6), 16)
    };
  }

  function loadSavedSettings() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (parsed && parsed.EFFECT_COLOR) {
        delete parsed.EFFECT_COLOR;
      }
      return parsed;
    } catch (error) {
      return null;
    }
  }

  function saveSettings(settings) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      // Ignore persistence issues in private mode.
    }
  }

  function waitForFluidAPI(maxTries, intervalMs, onReady) {
    let tries = 0;
    const timer = window.setInterval(function () {
      const api = window.__fluidBackgroundAPI;
      if (api && typeof api.applySettings === 'function' && typeof api.getConfig === 'function') {
        window.clearInterval(timer);
        onReady(api);
        return;
      }

      tries += 1;
      if (tries >= maxTries) {
        window.clearInterval(timer);
      }
    }, intervalMs);
  }

  function getActiveFluidAPI() {
    const isMobileViewport = window.innerWidth <= 1024;
    if (isMobileViewport && window.__fluidBackgroundAPIMobile) {
      return window.__fluidBackgroundAPIMobile;
    }
    if (!isMobileViewport && window.__fluidBackgroundAPIDesktop) {
      return window.__fluidBackgroundAPIDesktop;
    }
    return window.__fluidBackgroundAPI || null;
  }

  function buildControls(api) {
    if (document.getElementById(ROOT_ID)) return;

    const root = document.createElement('aside');
    root.id = ROOT_ID;
    root.className = 'bg-controls';
    root.innerHTML = [
      '<button class="bg-controls__toggle" type="button" aria-expanded="false">FX</button>',
      '<div class="bg-controls__panel" aria-hidden="true">',
      '  <p class="bg-controls__title">Background FX</p>',
      '  <label><span>Density</span><input data-key="DENSITY_DISSIPATION" type="range" min="0.2" max="3" step="0.05"></label>',
      '  <label><span>Velocity</span><input data-key="VELOCITY_DISSIPATION" type="range" min="0.2" max="2.5" step="0.05"></label>',
      '  <label><span>Vorticity</span><input data-key="CURL" type="range" min="0" max="12" step="1"></label>',
      '  <label><span>Pressure Iter</span><input data-key="PRESSURE_ITERATIONS" type="range" min="8" max="50" step="1"></label>',
      '  <label><span>Splat Radius</span><input data-key="SPLAT_RADIUS" type="range" min="0.05" max="0.45" step="0.01"></label>',
      '  <label><span>Splat Force</span><input data-key="SPLAT_FORCE" type="range" min="1000" max="12000" step="100"></label>',
      '  <label><span>Opacity</span><input data-key="EFFECT_OPACITY" type="range" min="0" max="1" step="0.01"></label>',
      '  <label class="bg-controls__switch"><input data-key="SHADING" type="checkbox"><span>Shading</span></label>',
      '  <label class="bg-controls__switch"><input data-key="BLOOM" type="checkbox"><span>Bloom</span></label>',
      '  <label><span>Effect Color</span><input data-key="EFFECT_COLOR" type="color"></label>',
      '  <div class="bg-controls__buttons">',
      '    <button type="button" data-preset="soft">Soft</button>',
      '    <button type="button" data-preset="medium">Medium</button>',
      '    <button type="button" data-preset="intense">Intense</button>',
      '  </div>',
      '  <div class="bg-controls__buttons">',
      '    <button type="button" data-action="splat">Pulse</button>',
      '    <button type="button" data-action="reset">Reset</button>',
      '  </div>',
      '</div>'
    ].join('');

    document.body.appendChild(root);

    const toggleBtn = root.querySelector('.bg-controls__toggle');
    const panel = root.querySelector('.bg-controls__panel');

    function setOpen(open) {
      root.classList.toggle('is-open', open);
      toggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      panel.setAttribute('aria-hidden', open ? 'false' : 'true');
    }

    toggleBtn.addEventListener('click', function () {
      setOpen(!root.classList.contains('is-open'));
    });

    toggleBtn.addEventListener('mouseenter', function () {
      document.body.classList.add('fx-hovering');
    });

    toggleBtn.addEventListener('mouseleave', function () {
      document.body.classList.remove('fx-hovering');
    });

    document.addEventListener('keydown', function (event) {
      if (event.key.toLowerCase() === 'b' && !event.metaKey && !event.ctrlKey && !event.altKey) {
        setOpen(!root.classList.contains('is-open'));
      }
    });

    let fluidAPI = api;
    const activeConfig = Object.assign({}, defaults, fluidAPI.getConfig(), loadSavedSettings() || {});
    api.applySettings(activeConfig);

    window.addEventListener('resize', function () {
      const nextAPI = getActiveFluidAPI();
      if (!nextAPI || nextAPI === fluidAPI) return;
      fluidAPI = nextAPI;
      fluidAPI.applySettings(activeConfig);
    });

    const inputs = root.querySelectorAll('input[data-key]');
    inputs.forEach(function (input) {
      const key = input.getAttribute('data-key');
      const value = activeConfig[key];

      if (input.type === 'checkbox') {
        input.checked = Boolean(value);
      } else if (input.type === 'color') {
        input.value = rgbToHex(value || defaults.EFFECT_COLOR);
      } else {
        input.value = value;
      }

      input.addEventListener('input', function () {
        let next;

        if (input.type === 'checkbox') {
          next = input.checked;
        } else if (input.type === 'color') {
          next = hexToRgb(input.value) || defaults.EFFECT_COLOR;
        } else {
          next = parseFloat(input.value);
        }

        activeConfig[key] = next;
        fluidAPI.applySettings({ [key]: next });
        saveSettings(activeConfig);
      });
    });

    root.querySelectorAll('button[data-preset]').forEach(function (button) {
      button.addEventListener('click', function () {
        const presetName = button.getAttribute('data-preset');
        const preset = presets[presetName];
        if (!preset) return;

        Object.assign(activeConfig, preset);
        fluidAPI.applySettings(preset);

        inputs.forEach(function (input) {
          const key = input.getAttribute('data-key');
          const value = activeConfig[key];
          if (input.type === 'checkbox') {
            input.checked = Boolean(value);
          } else if (input.type === 'color') {
            input.value = rgbToHex(value || defaults.EFFECT_COLOR);
          } else {
            input.value = value;
          }
        });

        saveSettings(activeConfig);
      });
    });

    root.querySelector('[data-action="splat"]').addEventListener('click', function () {
      fluidAPI.randomSplats(8);
    });

    root.querySelector('[data-action="reset"]').addEventListener('click', function () {
      Object.assign(activeConfig, defaults);
      fluidAPI.applySettings(defaults);

      inputs.forEach(function (input) {
        const key = input.getAttribute('data-key');
        const value = activeConfig[key];
        if (input.type === 'checkbox') {
          input.checked = Boolean(value);
        } else if (input.type === 'color') {
          input.value = rgbToHex(value || defaults.EFFECT_COLOR);
        } else {
          input.value = value;
        }
      });

      saveSettings(activeConfig);
    });
  }

  waitForFluidAPI(80, 100, function () {
    const api = getActiveFluidAPI();
    if (!api) return;
    buildControls(api);
  });
})();
