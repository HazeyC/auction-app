import BidForm from "./BidForm";
import type { Listing } from "../types";
import { useEffect, useState } from "react";

interface Props {
	listing: Listing;
	onBidSuccess: (updated: Listing) => void;
}

function formatDate(iso: string): string {
	return new Date(iso).toLocaleString(undefined, {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
}

function countdown(endsAt: string, status: string): string {
	if (status === "closed") return "Ended";
	const diff = new Date(endsAt).getTime() - Date.now();
	if (diff <= 0) return "Ended";

	const days = Math.floor(diff / 86_400_000);
	const hours = Math.floor((diff % 86_400_000) / 3_600_000);
	const minutes = Math.floor((diff % 3_600_000) / 60_000);
	const seconds = Math.floor((diff % 60_000) / 1000);

	if (days > 3) return `${days} days left`;
	if (days > 0) return `${days}d ${hours}h ${minutes}m ${seconds}s`;
	if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
	if (minutes > 0) return `${minutes}m ${seconds}s`;
	return `${seconds}s`;
}

export default function ListingDetail({ listing, onBidSuccess }: Props) {
	const [timeLeft, setTimeLeft] = useState(countdown(listing.endsAt, listing.status));

	useEffect(() => {
		setTimeLeft(countdown(listing.endsAt, listing.status));
		const interval = setInterval(() => {
			setTimeLeft(countdown(listing.endsAt, listing.status));
		}, 1000);
		return () => clearInterval(interval);
	}, [listing.endsAt]);

	return (
		<div className="listing-detail">
			<img
				src={listing.imageUrl}
				alt={listing.title}
				className="listing-detail__image"
			/>
			<div className="listing-detail__header">
				<span className={`badge badge--${listing.category}`}>
					{listing.category}
				</span>
				<span className={`status-badge status-badge--${listing.status}`}>
					{listing.status}
				</span>
			</div>
			<h2 className="listing-detail__title">{listing.title}</h2>
			<p className="listing-detail__description">{listing.description}</p>

			<div className="listing-detail__meta">
				<div className="meta-row">
					<span className="meta-label">Starting Price</span>
					<span className="meta-value">
						${listing.startingPrice.toLocaleString()}
					</span>
				</div>
				<div className="meta-row">
					<span className="meta-label">Current Bid</span>
					<span className="meta-value meta-value--highlight">
						${listing.currentBid.toLocaleString()}
					</span>
				</div>
				<div className="meta-row">
					<span className="meta-label">Current Bidder</span>
					<span className="meta-value">
						{listing.currentBidder ?? "No bids yet"}
					</span>
				</div>
				<div className="meta-row">
					<span className="meta-label">Auction Ends</span>
					<span className="meta-value">{formatDate(listing.endsAt)}</span>
				</div>
				<div className="meta-row">
					<span className="meta-label">Time Remaining</span>
					<span className="meta-value">{timeLeft}</span>
				</div>
			</div>

			{listing.status === "active" && (
				<BidForm listing={listing} onBidSuccess={onBidSuccess} />
			)}
		</div>
	);
}
