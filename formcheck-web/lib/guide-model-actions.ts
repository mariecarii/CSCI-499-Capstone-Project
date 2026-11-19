'use server'

import { cookies } from 'next/headers'
import { GUIDE_MODEL_COOKIE, parseGuideModel } from './guide-model'

export async function setGuideModel(formData: FormData){
    const model = parseGuideModel(formData.get('model') as string)
    // save in cookie so choice is remembered
    // changing a cookie in server re-renders the page so it updates the link
    ;(await cookies()).set(GUIDE_MODEL_COOKIE, model, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // remember choice for a year
        sameSite: 'lax',
    })
}
