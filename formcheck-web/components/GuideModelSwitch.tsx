import { setGuideModel } from '@/lib/guide-model-actions'
import type { GuideModel } from '@/lib/guide-model'

//btn to switch between male and female
export default function GuideModelSwitch({ current }: { current: GuideModel }){
    return(
        <form action={setGuideModel} className="row" aria-label="MuscleWiki demo model">
            Demo Model:
            <button type='submit' name='model' value="m" aria-pressed={current === 'm'}>
                {current === 'm' ? <strong>Male</strong> : 'Male'}
            </button>

            <button type='submit' name='model' value='f' aria-pressed={current === 'f'}>
                {current === 'f' ? <strong>Female</strong> : 'Female'}
            </button>
        </form>
    )
}