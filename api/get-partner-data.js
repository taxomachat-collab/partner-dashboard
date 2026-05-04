export default async function handler(req, res) {
    const { ref } = req.query

    if (!ref) {
        return res.status(400).json({ error: "missing ref" })
    }

    try {
        const makeUrl = `https://hook.eu2.make.com/jy1weiymgyawndtpf36pfdo7fgy1o9pe?ref=${encodeURIComponent(ref)}`

        const response = await fetch(makeUrl, {
            method: "GET",
        })

        const text = await response.text()

        try {
            const data = JSON.parse(text)
            return res.status(response.status).json(data)
        } catch {
            return res.status(500).json({
                error: "invalid JSON from Make",
                make_status: response.status,
                raw: text,
            })
        }
    } catch (err) {
        return res.status(500).json({
            error: "failed to fetch from Make",
            detail: String(err),
        })
    }
}
