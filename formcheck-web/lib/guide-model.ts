// switches between male or female model on 'how to' link click to musclewiki

export type GuideModel = 'm' | 'f'

export const GUIDE_MODEL_COOKIE = 'guide_model'

// if not f, then m
export function parseGuideModel(value: string | undefined): GuideModel{
    return value === 'f' ? 'f' : 'm'
}

// appends ?model=m or ?model=m to the musclewiki link
export function guideUrlFor(url: string, model: GuideModel): string {
    const u = new URL(url)
    u.searchParams.set('model', model)
    return u.toString()
}
