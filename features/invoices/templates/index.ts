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

const createTemplateLabel = (id: TemplateId) =>
  `${id.charAt(0).toUpperCase()}${id.slice(1)} Template`

export const templateOptions: { id: TemplateId; label: string }[] = (
  Object.keys(templates) as TemplateId[]
).map((id) => ({
  id,
  label: createTemplateLabel(id),
}))
