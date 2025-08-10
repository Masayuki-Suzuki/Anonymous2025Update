'use client'

import {
    TwitterShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    BlueskyShareButton,
    FacebookIcon,
    LinkedinIcon,
    BlueskyIcon,
    XIcon,
} from 'react-share'

type SocialShareProps = {
    url: string
    title: string
}

function SocialShares({ url, title }: SocialShareProps) {
    return (
        <div className="social-share flex items-center justify-end gap-3 mt-6 pt-6 pb-8 border-t border-gray">
            {/* X (Twitter) */}
            <TwitterShareButton url={url} title={title}>
                <XIcon size={32} round />
            </TwitterShareButton>

            {/* Facebook */}
            <FacebookShareButton url={url} hashtag={title}>
                <FacebookIcon size={32} round />
            </FacebookShareButton>

            {/* LinkedIn */}
            <LinkedinShareButton url={url} title={title}>
                <LinkedinIcon size={32} round />
            </LinkedinShareButton>

            {/* Bluesky */}
            <BlueskyShareButton url={url} title={title}>
                <BlueskyIcon size={32} round />
            </BlueskyShareButton>
        </div>
    )
}

export default SocialShares
