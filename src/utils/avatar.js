import crypto from 'crypto';

export function generateGravatarUrl(username) {
    const hash = crypto.createHash('md5').update(username.trim().toLowerCase()).digest('hex');
    return `https://www.gravatar.com/avatar/${hash}?s=150&d=identicon`;
}
