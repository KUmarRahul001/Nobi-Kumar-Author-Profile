/**
 * src/lib/mailchimp.ts
 * Mailchimp Marketing API integration for newsletter subscriptions
 * Uses @mailchimp/mailchimp_marketing SDK
 */
import mailchimp from '@mailchimp/mailchimp_marketing';
import crypto from 'crypto';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY!,
  server: process.env.MAILCHIMP_SERVER_PREFIX!, // e.g. 'us21'
});

const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID!;

export interface SubscribeResult {
  success: boolean;
  status: 'subscribed' | 'pending' | 'already_subscribed' | 'error';
  message: string;
}

/**
 * Subscribe an email address to the Mailchimp audience list
 * Handles deduplication — won't throw if already subscribed
 */
export async function subscribeToMailchimp(
  email: string,
  firstName?: string,
  lastName?: string
): Promise<SubscribeResult> {
  try {
    await mailchimp.lists.addListMember(AUDIENCE_ID, {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName ?? '',
        LNAME: lastName ?? '',
      },
    });

    return {
      success: true,
      status: 'subscribed',
      message: 'Successfully subscribed to the newsletter.',
    };
  } catch (err: unknown) {
    const body = (err as { response?: { body?: Record<string, unknown> } })?.response?.body ?? err;

    // Mailchimp returns 400 with title 'Member Exists' for duplicates
    if (body?.title === 'Member Exists') {
      return {
        success: true,
        status: 'already_subscribed',
        message: 'You are already subscribed.',
      };
    }

    return {
      success: false,
      status: 'error',
      message: body?.detail ?? 'Subscription failed. Please try again.',
    };
  }
}

/**
 * Unsubscribe an email address from the audience list
 */
export async function unsubscribeFromMailchimp(email: string): Promise<void> {
  const subscriber_hash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');

  await mailchimp.lists.updateListMember(AUDIENCE_ID, subscriber_hash, {
    status: 'unsubscribed',
  });
}

export default mailchimp;
