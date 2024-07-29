'use client';

import { useEffect, type RefObject, useRef } from 'react';
import { MailOpen } from 'lucide-react';
import { toast } from 'sonner';
import { isSafari } from '@knowingly/utils';
import { Button } from '@knowingly/ui/button';
import { cn } from '@knowingly/ui';
import { Icons } from '@knowingly/icons';

type EmailFrameProps = {
  innerHTML: string;
  isServer?: boolean;
  showOpenInNewTab?: boolean;
  wrapperClassName?: string;
} & React.HTMLProps<HTMLIFrameElement>;

function renderHTMLToIFrame(ref: RefObject<HTMLIFrameElement>, html: string) {
  if (!ref.current) {
    return;
  }
  const iframeDocument = ref.current.contentDocument;

  if (!iframeDocument) {
    return;
  }
  const fontLink = iframeDocument.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href =
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap';
  iframeDocument.head.appendChild(fontLink);

  iframeDocument.body.innerHTML = html;
}

export function EmailFrame(props: EmailFrameProps) {
  const {
    innerHTML,
    isServer,
    showOpenInNewTab = true,
    wrapperClassName,
    ...defaultProps
  } = props;

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!isSafari() || !iframeRef.current || isServer) {
      return;
    }

    renderHTMLToIFrame(iframeRef, innerHTML);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- isServer doesn't matter
  }, [innerHTML]);

  function handleOpen() {
    if (innerHTML.trim().length === 0) {
      toast.error('There is no data to preview.');
      return;
    }

    const newWindow = window.open('about:blank', '_blank');
    newWindow?.focus();

    const newDoc = newWindow?.document;
    if (!newDoc) {
      toast.error('Something went wrong.');
      return;
    }

    newDoc.open();
    newDoc.write(innerHTML);
    newDoc.close();
  }

  return (
    <div className={cn('relative', wrapperClassName)}>
      <iframe
        title="Email preview"
        {...defaultProps}
        onLoad={() => {
          if (isSafari() || isServer) {
            return;
          }

          renderHTMLToIFrame(iframeRef, innerHTML);
        }}
        ref={iframeRef}
        srcDoc={isServer ? innerHTML : ''}
      />

      {showOpenInNewTab ? (
        <Button
          variant="ringHover"
          onClick={handleOpen}
          type="button"
        >
          <Icons.mailOpened className="mr-2 size-4" />
          <span>Open in new tab</span>
        </Button>
      ) : null}
    </div>
  );
}
