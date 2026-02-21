"use client";

export default function BusinessCard() {
  return (
    <div className="bcard">
      {/* Animated border */}
      <div className="bcard-border" />

      {/* Content */}
      <div className="bcard-content">
        {/* Logo — "H." by default, expands to "Hone." on hover */}
        <div className="bcard-logo">
          {/* "H" — always visible */}
          <svg
            className="bcard-h"
            viewBox="0 0 30 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <text
              x="0"
              y="34"
              fontFamily="var(--font-fraunces), Georgia, serif"
              fontSize="38"
              fontWeight="600"
              fill="var(--color-snow, #F6F7F9)"
            >
              H
            </text>
          </svg>

          {/* "one" — hidden by default, slides open on hover */}
          <div className="bcard-mid">
            <svg
              className="bcard-mid-svg"
              viewBox="0 0 76 40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <text
                x="0"
                y="34"
                fontFamily="var(--font-fraunces), Georgia, serif"
                fontSize="38"
                fontWeight="600"
                fill="var(--color-snow, #F6F7F9)"
              >
                one
              </text>
            </svg>
          </div>

          {/* Teal dot — always visible */}
          <svg
            className="bcard-dot"
            viewBox="0 0 18 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <text
              x="2"
              y="34"
              fontFamily="var(--font-fraunces), Georgia, serif"
              fontSize="38"
              fontWeight="600"
              fill="var(--color-teal, #00D4AA)"
            >
              .
            </text>
          </svg>
        </div>

        {/* Details — centered, revealed on hover */}
        <div className="bcard-details">
          <p className="bcard-name">Niell Alfajora</p>
          <p className="bcard-role">Fractional Ops &amp; Tech Partner</p>
          <p className="bcard-contact">+63 969 613 6802</p>
          <p className="bcard-contact">hello@honestudio.cv</p>
        </div>
      </div>

      {/* Domain — bottom */}
      <p className="bcard-domain">honestudio.cv</p>
    </div>
  );
}
