/**
 * Layer content for the Nano Banana Pro layered prompt system.
 * All content is tattoo-scoped (AI tattoo generator). Each layer uses
 * FORBIDDEN before REQUIRED. Prose only, no CSV/tags.
 */

export const LAYER_SEPARATOR = "\n\n";

export const LAYER_HEADERS: Record<number, string> = {
  0: "[LAYER 0 — Base / Persona]",
  1: "[LAYER 1 — Composition / Frame]",
  2: "[LAYER 2 — Subject / Content]",
  3: "[LAYER 3 — Detail]",
  4: "[LAYER 4 — Lighting / Atmosphere]",
  5: "[LAYER 5 — Style]",
};

// ---------------------------------------------------------------------------
// L0 — Base / Persona (tattoo generator foundation)
// Design Only vs Person Shot are mutually exclusive; use the correct variant.
// ---------------------------------------------------------------------------

export const L0_PERSONA_BASE =
  "Act as a professional tattoo and skin photographer. You generate only tattoo-related imagery. Do not produce generic portraits, landscapes, or non-tattoo imagery.";

/** Use when output must be a standalone tattoo design (no body, no portrait). */
export const L0_OUTPUT_DESIGN_ONLY =
  "Output must be a standalone tattoo design only: the tattoo art itself, with no body, no portrait, no background figure. The image is the design alone, suitable for reference or transfer.";

/** Use when output must show the tattoo on a person or body part (default). */
export const L0_OUTPUT_PERSON_SHOT =
  "Output must show the tattoo applied on skin or a body part: a person shot or body-part shot with the tattoo integrated realistically. The tattoo is on skin, not a floating design.";

/** Returns L0 persona with mutually exclusive output type. Default is person_shot. */
export function getL0Persona(
  outputType: "design_only" | "person_shot" = "person_shot"
): string {
  const scope =
    " Every output must be tattoo-related: either a standalone tattoo design, or a tattoo applied on skin or body part, or a tattoo edit (removal, cover-up, enhancement). ";
  return (
    L0_PERSONA_BASE +
    scope +
    (outputType === "design_only"
      ? L0_OUTPUT_DESIGN_ONLY
      : L0_OUTPUT_PERSON_SHOT)
  );
}

/** Default L0 persona (person shot) for backward compatibility. */
export const L0_PERSONA = getL0Persona("person_shot");

export const L0_FORBIDDEN =
  "FORBIDDEN: No frames, borders, letterboxing, or black bars around the image. No non-tattoo imagery such as generic portraits without tattoo relevance, or landscapes and objects unless they are part of a tattoo design. No intimate areas. Never generate two or more images in a single output. Never output two images in one: no side-by-side duplication of the same tattoo, no repeated or mirrored copy of the design within the same frame, no composite of two separate compositions in one image—exactly one composition only.";

export const L0_REQUIRED =
  "REQUIRED: Generate exactly one image and exactly one composition. One tattoo or one tattooed body part must appear once in the frame—never repeated, duplicated, mirrored, or shown side-by-side in the same output. Output must be tattoo-related only. Keep the result realistic without exaggerating.";

// ---------------------------------------------------------------------------
// L1 — Composition / Frame (tattoo output framing)
// ---------------------------------------------------------------------------

export const L1_FORBIDDEN =
  "FORBIDDEN: No letterboxing, no artificial crop or zoom artifacts, no multiple panels or frames. No duplicated or repeated tattoo design within the same image—no side-by-side copy, no mirrored twin, no two-in-one layout where the same design appears twice. No perspective shifts that break the single-shot tattoo or tattooed-body composition. No composition that implies multiple people or multiple limbs unless explicitly requested (e.g. couples).";

export const L1_REQUIRED =
  "REQUIRED: Single shot composition. One coherent frame with the tattoo or tattooed body part appearing exactly once—never repeated, duplicated, or mirrored within the frame. One person or one body part only unless the prompt clearly asks for a couples or multi-person shot. Natural FOV and aspect appropriate for tattoo presentation. No borders or margins. The body part must be fully defined within the frame with clear boundaries, not fading into the edges or background.";

// ---------------------------------------------------------------------------
// L2 — Subject / Content (tattoo subject, placement, body part)
// ---------------------------------------------------------------------------

export const L2_FORBIDDEN =
  "FORBIDDEN: No extra limbs, no duplicated body parts, no double articulations (e.g. two arms or two sets of limbs) unless the user explicitly requests a couples shot with a realistic, intentional composition. No duplicate or repeated tattoo design in the same image—the same design must not appear twice, side-by-side, or mirrored in one output. No incoherent or non-tattoo subject. No floating elements that do not belong to the tattoo or skin. No anatomy fading, blending, or dissolving into the background or paper—skin and body must have clear, defined edges and stay solid; the body must not diffuse or merge with other elements. No ambiguous anatomy: the limb or body part must be unmistakably identifiable (arm, forearm, leg, calf, thigh, back, etc.), never a generic or unclear extremity that could be arm or leg.";

export const L2_REQUIRED =
  "REQUIRED: One coherent tattoo subject. Clear placement and readable design. When body or skin is shown: one body part or one person only (e.g. one arm, one leg), unless the prompt explicitly describes a couples or multi-person shot with realistic composition. Human anatomy must be rendered with confidence and realism so the body part is clearly identifiable: if it is an arm, the flow toward wrist and hand (or toward shoulder and neck) must be readable even when not fully in frame; if a leg, the flow toward knee, calf, ankle (or thigh, hip) must be evident. Same for forearm, upper arm, calf, thigh, back, chest—each limb or region must read as that specific part of the body with realistic proportions and anatomical logic. Anatomy must have sharp edges against the background, remain solid with no fading or diffusion, and look almost perfect in terms of extremities so the viewer knows at once whether it is an arm, a leg, or another body part.";

// ---------------------------------------------------------------------------
// L3 — Detail (optional; can be skipped or used for detail level)
// ---------------------------------------------------------------------------

export const L3_REQUIRED =
  "REQUIRED: Tattoo and skin detail appropriate for a professional presentation: clear linework, readable texture, no oversharpening or artificial detail. When a limb is shown: anatomical landmarks (e.g. elbow, wrist, knee, ankle, shoulder) or the clear direction of the limb (toward hand, toward shoulder, toward foot) must be evident so the body part is unmistakably an arm, leg, calf, forearm, etc.";

// ---------------------------------------------------------------------------
// L4 — Lighting / Atmosphere (skin and tattoo lighting)
// ---------------------------------------------------------------------------

export const L4_FORBIDDEN =
  "FORBIDDEN: No artificial vignettes, no mismatched shadows, no floating or overlay lighting that detaches the tattoo from the skin. No glossy or artificial skin shine unless appropriate for fresh ink. No harsh bokeh or artificial depth-of-field effects.";

export const L4_REQUIRED =
  "REQUIRED: Realistic lighting for skin and tattoo. Soft, natural key light with subtle fill where needed; coherent shadows and color temperature; exposure consistent across the frame. Natural depth; avoid harsh bokeh. Lighting that makes the tattoo look integrated into the skin.";

// ---------------------------------------------------------------------------
// L5 — Style (tattoo style only)
// ---------------------------------------------------------------------------

export const L5_FORBIDDEN =
  "FORBIDDEN: No non-tattoo art styles (e.g. pure landscape or portrait without tattoo relevance). No style drift away from the requested tattoo aesthetic. No generic illustration that is not clearly a tattoo or tattoo-on-skin. When 'patchwork' is requested: never render quilt-like design, fabric patches, sewing stitches, seam lines, hash marks along edges, rectangular or square segments that touch each other, or any design where the tattoos are connected without bare skin between them; patchwork in tattooing means separate tattoo pieces with visible bare skin between each piece.";

export const L5_HEADER_ONLY =
  "REQUIRED: Apply the following tattoo style and design direction.";

// ---------------------------------------------------------------------------
// Black-and-white tattoo (ink only, not the photo)
// ---------------------------------------------------------------------------

export const L5_BLACK_WHITE_TATTOO_ONLY =
  "The tattoo ink only must be black and grey (black ink with grey shading within the design); the tattoo design itself has no color. The photograph must stay in full color: skin must keep its natural skin tone and color, the background must keep its natural colors. Do not desaturate the image. Do not apply a black-and-white or grayscale filter to the whole photo. Only the tattoo is black ink; the rest of the image is natural color.";

// ---------------------------------------------------------------------------
// Patchwork tattoo style
// ---------------------------------------------------------------------------

export const L5_PATCHWORK_FORBIDDEN =
  "FORBIDDEN for patchwork: No quilt appearance. No fabric squares or rectangles. No stitching, seam lines, or hash marks. No design where tattooed segments are placed directly next to each other with no bare skin in between. No continuous interlocking patches. Patchwork in tattooing is NOT fabric patchwork.";

export const L5_PATCHWORK_STYLE_DESCRIPTION =
  "REQUIRED for patchwork style: Generate multiple individual, stand-alone tattoo designs (e.g. flash art: daggers, roses, swallows, skulls, small characters) on the same body part. Each tattoo is a separate piece. There must be visible bare skin (natural, untouched skin) between every tattoo—gaps of skin between designs, creating a sticker-like or collected sleeve. The tattoos must not touch or connect; the skin between them is clearly visible. Do not draw quilt, fabric, stitching, seams, or rectangular patches; draw normal tattoos with empty skin between them.";
