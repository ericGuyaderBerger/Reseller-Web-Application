﻿/// <reference path="~/Scripts/_references.js" />

Microsoft.WebPortal.RegistrationConfirmationPresenter = function (webPortal, feature, registrationConfirmationViewModel) {
    /// <summary>
    /// Shows the registration confirmation page.
    /// </summary>
    /// <param name="webPortal">The web portal instance.</param>
    /// <param name="feature">The feature for which this presenter is created.</param>
    /// <param name="registrationConfirmationViewModel">The registration confirmation view model.</param>
    this.base.constructor.call(this, webPortal, feature, "Home", "/Template/RegistrationConfirmation/");

    this.viewModel = registrationConfirmationViewModel;
    this.viewModel.TotalPrice = 0

    if (this.viewModel.Subscriptions) {
        for (var i in this.viewModel.Subscriptions) {
            this.viewModel.Subscriptions[i].PriceDisplay = "$" + this.viewModel.Subscriptions[i].Price;
            this.viewModel.TotalPrice += parseFloat(this.viewModel.Subscriptions[i].Price);
        }
    }

    this.viewModel.TotalPrice = "$" + this.viewModel.TotalPrice.toFixed(2);
    var addressLine = this.viewModel.AddressLine1;

    if (this.viewModel.AddressLine2) {
        addressLine += " " + this.viewModel.AddressLine2;
    }

    this.viewModel.Address = [
        addressLine,
        this.viewModel.City + ", " + this.viewModel.State + " " + this.viewModel.ZipCode,
        this.viewModel.Country
    ];

    this.viewModel.ContactInformation = [
        this.viewModel.FirstName + " " + this.viewModel.LastName,
        this.viewModel.Email,
        this.viewModel.Phone
    ];

    this.viewModel.CreditCardInformation = [
        this.viewModel.CreditCardNumber,
        this.viewModel.CreditCardExpiry
    ];

    this.onDoneClicked = function () {
        // go back to the offers page
        webPortal.Journey.start(Microsoft.WebPortal.Feature.Offers);
    }
}

// inherit BasePresenter
$WebPortal.Helpers.inherit(Microsoft.WebPortal.RegistrationConfirmationPresenter, Microsoft.WebPortal.Core.TemplatePresenter);

Microsoft.WebPortal.RegistrationConfirmationPresenter.prototype.onRender = function () {
    /// <summary>
    /// Called when the presenter is about to be rendered.
    /// </summary>

    ko.applyBindings(this, $("#RegistrationConfirmationContainer")[0]);

}

//@ sourceURL=RegistrationConfirmationPresenter.js