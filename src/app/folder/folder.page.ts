/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonDatetime } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { it } from 'date-fns/locale';
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  @ViewChild('ionDaData') ionDaData: IonDatetime;
  public folder: string;
  public form: FormGroup;
  public sDaDataNoBind: string;
  public get daData() { return this.form.get('daData'); }
  public get daDataNoBind() { return this.form.get('daDataNoBind'); }

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');

    this.form = new FormGroup({});
    this.form.addControl('daData', new FormControl('', []));
    this.form.addControl('daDataNoBind', new FormControl('', []));
  }

  /**
   * Evento che scatta quando una nuova data è selezionata
   */
   public daDataChanged() {

    if (this.ionDaData) {
      //Setto la data per il formato corretto su DB
      const date = format(parseISO(this.ionDaData.value as string), 'yyyy-MM-dd', { locale: it });
      this.form.controls.daData.setValue(date);

      //Setto la data in formato corretto per essere visualizzata (es. 22 giugno 1981)
      const sData = format(parseISO(this.ionDaData.value as string), 'dd MMMM yyyy', { locale: it });
      this.form.controls.daDataNoBind.setValue(sData);
    }
  }

  /**
   * Annulla la data
   */
   public clearDaData() {
    this.ionDaData.reset();
    this.ionDaData.cancel(true);
    this.form.controls.daData.setValue(null);
    this.form.controls.daDataNoBind.setValue(null);
  }

  /**
   * Chiude la dialog senza fare nulla
   */
  public closeDaData() {
    this.ionDaData.cancel(true);
  }

  /**
   * Conferma la data
   */
   public confirmDaData() {
    this.ionDaData.confirm(true);
  }

}
