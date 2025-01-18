import {
  writeToProfile,
  rule,
  map,
  toKey,
  ToKeyParam,
  mapSimultaneous,
  FromAndToKeyCode,
  ModifierKeyCode,
  layer,
  LayerKeyCode,
} from "karabiner.ts";

const lCmd = "l⌘";
const rCmd = "r⌘";
const lCtrl = "l⌃";
const rCtrl = "r⌃";
const lShift = "l⇧";
const rShift = "r⇧";
const lOpt = "l⌥";
const rOpt = "r⌥";

const LHandMods = {
  a: lCmd,
  s: lOpt,
  d: lShift,
  f: lCtrl,
};

const RHandMods = {
  j: rCtrl,
  k: rShift,
  l: rOpt,
  ";": rCmd,
};

const singleKeyMappings = (keyMapping: { [key: string]: string }) => {
  const singleKeyMapping = (key: string, modifier: string) => {
    const keyParam = key as FromAndToKeyCode;
    const modifierParam = modifier as ToKeyParam;
    return map(keyParam)
      .toIfAlone(keyParam, {}, { halt: true })
      .toDelayedAction(toKey("vk_none"), toKey(keyParam))
      .toIfHeldDown(modifierParam, {}, { halt: true });
  };

  return Object.entries(keyMapping).map(([key, modifier]) => {
    return singleKeyMapping(key, modifier);
  });
};

const twoKeyMappings = (keyMapping: { [key: string]: string }) => {
  const twoKeyMapping = (
    key1Mapping: [string, string],
    key2Mapping: [string, string]
  ) => {
    const key1 = key1Mapping[0] as FromAndToKeyCode;
    const key2 = key2Mapping[0] as FromAndToKeyCode;
    const key1M = key1Mapping[1] as ToKeyParam;
    const key2M = key2Mapping[1] as ModifierKeyCode;

    return mapSimultaneous([key1, key2], { key_down_order: "strict" })
      .toIfAlone(key1)
      .toIfAlone(key2)
      .toIfHeldDown(key1M, key2M);
  };

  const entries = Object.entries(keyMapping);
  const result: any[] = [];
  for (let i = 0; i < entries.length - 1; i++) {
    for (let j = 0; j < entries.length; j++) {
      if (i == j) continue;
      result.push(twoKeyMapping(entries[i], entries[j]));
    }
  }
  return result;
};

const threeKeyMappings = (keyMapping: { [key: string]: string }) => {
  const threeKeyMapping = (
    key1Mapping: [string, string],
    key2Mapping: [string, string],
    key3Mapping: [string, string]
  ) => {
    const key1 = key1Mapping[0] as FromAndToKeyCode;
    const key2 = key2Mapping[0] as FromAndToKeyCode;
    const key3 = key3Mapping[0] as FromAndToKeyCode;
    const key1M = key1Mapping[1] as ToKeyParam;
    const key2M = key2Mapping[1] as ModifierKeyCode;
    const key3M = key3Mapping[1] as ModifierKeyCode;

    return mapSimultaneous([key1, key2, key3]).toIfHeldDown(key1M, [
      key2M,
      key3M,
    ]);
  };

  const entries = Object.entries(keyMapping);
  const result: any[] = [];
  for (let i = 0; i < entries.length - 1; i++) {
    for (let j = i + 1; j < entries.length; j++) {
      for (let k = j + 1; k < entries.length; k++) {
        result.push(threeKeyMapping(entries[i], entries[j], entries[k]));
      }
    }
  }
  return result;
};

const generateHomeRowMods = (keyMapping: { [key: string]: string }) => {
  return [
    ...threeKeyMappings(keyMapping),
    ...twoKeyMappings(keyMapping),
    ...singleKeyMappings(keyMapping),
  ];
};

const generateArrowKeys = () => {
  const layerKey = lCmd as LayerKeyCode;
  return layer(layerKey, "cmd-arrow").manipulators([
    map("h").to("←"),
    map("j").to("↓"),
    map("k").to("↑"),
    map("l").to("→"),
  ]);
};

writeToProfile(
  "Home row mods",
  [
    rule("Home row mods - cmd, opt, shift, ctrl").manipulators([
      ...generateHomeRowMods(LHandMods),
      ...generateHomeRowMods(RHandMods),
    ]),
    {
      description:
        "Caps Lock → Hyper Key (⌃⌥⇧⌘) | Escape if alone | Use fn + caps lock to enable caps lock",
      manipulators: [
        {
          from: { key_code: "caps_lock" },
          to: [
            {
              key_code: "left_shift",
              modifiers: ["left_command", "left_control", "left_option"],
            },
          ],
          to_if_alone: [{ key_code: "escape" }],
          type: "basic",
        },
      ],
    },
    {
      description: "Change left_command+hjkl to arrow keys",
      manipulators: [
        {
          from: {
            key_code: "h",
            modifiers: {
              mandatory: ["left_command"],
              optional: ["any"],
            },
          },
          to: [{ key_code: "left_arrow" }],
          type: "basic",
        },
        {
          from: {
            key_code: "j",
            modifiers: {
              mandatory: ["left_command"],
              optional: ["any"],
            },
          },
          to: [{ key_code: "down_arrow" }],
          type: "basic",
        },
        {
          from: {
            key_code: "k",
            modifiers: {
              mandatory: ["left_command"],
              optional: ["any"],
            },
          },
          to: [{ key_code: "up_arrow" }],
          type: "basic",
        },
        {
          from: {
            key_code: "l",
            modifiers: {
              mandatory: ["left_command"],
              optional: ["any"],
            },
          },
          to: [{ key_code: "right_arrow" }],
          type: "basic",
        },
      ],
    },
  ],
  {
    "basic.to_if_alone_timeout_milliseconds": 1000,
    "basic.to_if_held_down_threshold_milliseconds": 100,
    "basic.to_delayed_action_delay_milliseconds": 200,
    "basic.simultaneous_threshold_milliseconds": 150,
  }
);
