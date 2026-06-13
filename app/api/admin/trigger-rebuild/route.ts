import { NextResponse } from 'next/server'

  export const dynamic = 'force-dynamic'

  export async function POST() {
    try {
      const VERCEL_TOKEN = process.env.VERCEL_TOKEN
      const PROJECT_ID   = process.env.VERCEL_PROJECT_ID

      if (!VERCEL_TOKEN || !PROJECT_ID) {
        return NextResponse.json({ error: 'Vercel credentials not configured' }, { status: 500 })
      }

      // Get latest deployment to redeploy
      const listRes = await fetch(
        `https://api.vercel.com/v6/deployments?projectId=${PROJECT_ID}&limit=1&target=production`,
        { headers: { Authorization: `Bearer ${VERCEL_TOKEN}` } }
      )
      const listData = await listRes.json()
      const latest = listData.deployments?.[0]
      if (!latest) return NextResponse.json({ error: 'No deployment found' }, { status: 404 })

      // Trigger redeploy
      const redeployRes = await fetch('https://api.vercel.com/v13/deployments', {
        method: 'POST',
        headers: { Authorization: `Bearer ${VERCEL_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'shamimforever-api-server',
          deploymentId: latest.uid,
          target: 'production',
        }),
      })
      const redeployData = await redeployRes.json()

      if (redeployData.id || redeployData.uid) {
        return NextResponse.json({ success: true, deploymentId: redeployData.id || redeployData.uid })
      }
      return NextResponse.json({ error: redeployData.error?.message || 'Redeploy failed' }, { status: 500 })
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 })
    }
  }
  