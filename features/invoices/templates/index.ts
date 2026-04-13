import SimpleTemplate from "./SimpleTemplate"
import ModernTemplate from "./ModernTemplate"
import ElegantTemplate from "./ElegantTemplate"
import VibrantTemplate from "./VibrantTemplate"

export const templates = {
  simple: SimpleTemplate,
  modern: ModernTemplate,
  elegant: ElegantTemplate,
  vibrant: VibrantTemplate,
}

export type TemplateId = keyof typeof templates

export const templateOptions: { id: TemplateId; label: string }[] = [
  { id: "simple", label: "Simple Template" },
  { id: "modern", label: "Modern Template" },
  { id: "elegant", label: "Elegant Template" },
  { id: "vibrant", label: "Vibrant Template" },
]
