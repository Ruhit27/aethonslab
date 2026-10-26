# WhatsApp Lead Autopilot: setup

How it works: someone messages your WhatsApp Business number → Meta sends the message to `https://<your-site>/api/whatsapp` → Claude writes a reply → the site sends it back through Meta's WhatsApp Cloud API. The code lives in [app/api/whatsapp/route.ts](../app/api/whatsapp/route.ts). The business facts Claude uses are in [lib/autopilot.ts](../lib/autopilot.ts).

**Right now** the website's WhatsApp button opens a chat with +880 1743 001963 (your personal WhatsApp), and you reply yourself. Automatic replies start once you finish the steps below.

## Fastest way to see it: on-site demo and Twilio sandbox

**On-site demo, about 2 minutes.** Put your Claude API key in `ANTHROPIC_API_KEY` in `.env.local` and open `http://localhost:3000/demo`. It's a WhatsApp-style chat running the same AI with the same tone as the real bot.

**Real WhatsApp on your phone with the Twilio Sandbox, about 15 minutes.** This doesn't need Meta's test number, which kept failing with "An error occurred while creating the test account."
1. Create a free Twilio account at twilio.com and open the WhatsApp Sandbox: Messaging → Try it out → Send a WhatsApp message. Older consoles have it under Sandbox settings.
2. From your phone, send the `join <code>` message the page shows to **+1 415 523 8886**.
3. Run `cloudflared tunnel --url http://localhost:3000` and copy the `https://….trycloudflare.com` link.
4. In the sandbox settings, set **"When a message comes in"** to `<tunnel link>/api/twilio-whatsapp` with method **POST**, and save.
5. In `.env.local`, set `TWILIO_AUTH_TOKEN` (Twilio Console → Account info) and `TWILIO_WEBHOOK_URL` (the exact URL from step 4).
6. Message the sandbox number from WhatsApp. The AI replies.

Sandbox limits: only phones that sent `join` can chat, and the session expires 3 days after joining (send `join` again).

## Important: don't connect your personal number directly

If you register a number on the WhatsApp Cloud API, **it stops working in the normal WhatsApp app**. Do Phase A with Meta's free test number first. Then pick a real number in Phase B.

## Phase A: test it with Meta's free test number (about 30 min)

This doesn't touch your personal WhatsApp at all.

1. **Create a Meta app.** Go to developers.facebook.com → My Apps → Create app → choose the business messaging / WhatsApp use case, and link or create a Meta Business portfolio.
2. **Get test credentials.** Open WhatsApp → API Setup. Meta gives you:
   - a **test phone number** and its **Phone number ID**
   - a **temporary access token** (expires after about 24 hours, which is fine for testing)

   Under "To", add **+880 1743 001963** as a test recipient and confirm the code WhatsApp sends you.
3. **Get the app secret.** App settings → Basic → App secret.
4. **Deploy the site** somewhere with a public HTTPS address, such as Vercel. Meta can't reach `localhost`. Set these environment variables there (see [.env.example](../.env.example)):
   - `ANTHROPIC_API_KEY`
   - `WHATSAPP_VERIFY_TOKEN`: any random string you make up
   - `WHATSAPP_APP_SECRET`: from step 3
   - `WHATSAPP_ACCESS_TOKEN`: from step 2
   - `WHATSAPP_PHONE_NUMBER_ID`: from step 2
5. **Connect the webhook.** WhatsApp → Configuration → Webhook:
   - Callback URL: `https://<your-site>/api/whatsapp`
   - Verify token: the same string as `WHATSAPP_VERIFY_TOKEN`
   - Click "Verify and save", then subscribe to the **messages** field.
6. **Try it.** From your personal WhatsApp, send "Hi, I run a salon" to the test number. You should get an AI reply within a few seconds.

If no reply arrives, check the site's server logs. The route logs a clear error when a key is missing or Meta rejects a send.

## Phase B: a real number for the website button

| Option | What it means | Recommendation |
|---|---|---|
| **New dedicated number** | Buy a second SIM, register it on the Cloud API, and point the website button at it. Your personal WhatsApp stays as it is. | **Best.** Simple and clean, and it's also how you'd set it up for clients. |
| **Keep 01743001963 (coexistence)** | Move the number from personal WhatsApp to the **WhatsApp Business app** (your chats come with it), then connect it to the Cloud API using Meta's "coexistence" onboarding. The bot replies, and you can still read and answer in the app. | Possible, but onboarding goes through Meta's Embedded Signup, usually via a provider, and group chats don't sync. |

After Phase B:
1. Replace the temporary token with a **permanent system-user token** (Business Settings → Users → System users → generate a token with `whatsapp_business_messaging` and `whatsapp_business_management`).
2. Update `WHATSAPP_PHONE_NUMBER_ID` for the new number.
3. If the number changed, update `WHATSAPP_NUMBER` in [components/constants.tsx](../components/constants.tsx) so the button points to it.

## Rules and limits to know

- **24-hour window:** the bot can reply freely for 24 hours after a person's last message. Messaging someone after that requires a pre-approved template. The bot only ever replies, so this is fine.
- **Cost:** check Meta's current WhatsApp pricing page. Replies inside the 24-hour window are generally not charged, but confirm for Bangladesh before you quote anything to clients.
- **Memory:** conversation history is kept in server memory (the last 12 messages per person). It resets on redeploy and isn't shared across server instances. That's fine for your own demo; client setups need a database.
- **Text only:** voice notes and images get a polite "please type your question" reply.

Sources: Meta's [Cloud API send-messages guide](https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-messages) (Graph API v26.0) and [coexistence onboarding](https://developers.facebook.com/documentation/business-messaging/whatsapp/embedded-signup/onboarding-business-app-users/).
