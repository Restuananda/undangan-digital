import { useState } from "react";
import { Check, Copy, Gift } from "lucide-react";
import { Section } from "../layout/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import { Divider } from "../ui/Divider";
import { copyToClipboard } from "../../lib/clipboard";
import { weddingData } from "../../data/wedding";
import { cn } from "../../lib/utils";

function CopyRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const success = await copyToClipboard(value);
    if (success) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  }

  return (
    <div className="flex items-center justify-between gap-3 py-2">
      <div>
        <p className="font-body text-[11px] uppercase tracking-widest text-charcoal-soft">{label}</p>
        <p className="font-display text-lg text-charcoal tracking-wide">{value}</p>
      </div>
      <button
        onClick={handleCopy}
        className={cn(
          "flex shrink-0 items-center gap-1.5 border px-3 py-2 text-[10px] uppercase tracking-widest transition-colors cursor-pointer",
          copied
            ? "border-moss bg-moss text-ivory"
            : "border-beige-dark text-charcoal-soft hover:border-gold hover:text-gold"
        )}
      >
        {copied ? <Check size={13} strokeWidth={2} /> : <Copy size={13} strokeWidth={1.6} />}
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}

export function WeddingGift() {
  const [isOpen, setIsOpen] = useState(false);
  const { gift } = weddingData;

  return (
    <Section tone="cream">
      <SectionHeading
        eyebrow="Tanda Kasih"
        title="Wedding Gift"
        description="Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Dan jika memberi adalah ungkapan tanda kasih, Anda dapat memberi kado secara cashless."
      />

      <div className="mt-10 flex justify-center">
        <Button icon={<Gift size={15} strokeWidth={1.5} />} onClick={() => setIsOpen(true)}>
          Kirim Hadiah
        </Button>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Wedding Gift">
        <div className="flex flex-col divide-y divide-beige-dark/40">
          {gift.bankAccounts.map((account) => (
            <div key={account.id} className="py-1">
              <span className="font-accent italic text-sm text-gold">{account.bankName}</span>
              <CopyRow label="Nomor Rekening" value={account.accountNumber} />
              <p className="pb-3 font-body text-xs text-charcoal-soft">a.n. {account.accountHolder}</p>
            </div>
          ))}

          {gift.eWallets.map((wallet) => (
            <div key={wallet.id} className="py-4">
              <span className="font-accent italic text-sm text-gold">{wallet.providerName}</span>
              <CopyRow label="Nomor E-Wallet" value={wallet.phoneNumber} />
              <p className="pb-1 font-body text-xs text-charcoal-soft">a.n. {wallet.accountHolder}</p>
            </div>
          ))}
        </div>

        <Divider className="my-6" />

        <div>
          <span className="font-accent italic text-sm text-gold">Kirim Kado Fisik</span>
          <div className="mt-3 space-y-2 font-body text-[13px] leading-relaxed text-charcoal-soft">
            <p>
              <span className="text-charcoal-soft/70">Nama Penerima: </span>
              <span className="text-charcoal">{gift.shippingAddress.receiverName}</span>
            </p>
            <p>
              <span className="text-charcoal-soft/70">No. HP: </span>
              <span className="text-charcoal">{gift.shippingAddress.phoneNumber}</span>
            </p>
            <p>
              <span className="text-charcoal-soft/70">Alamat: </span>
              <span className="text-charcoal">{gift.shippingAddress.address}</span>
            </p>
          </div>
        </div>
      </Modal>
    </Section>
  );
}
