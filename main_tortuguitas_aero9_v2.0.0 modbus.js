var fs = require('fs');
var modbus = require('jsmodbus');
var PubNub = require('pubnub');


var timeStop=25;
var secPubNub=0;

var CanPrintct = 0, CanPrintresults = null, CanPrintctIn = null,  CanPrintctOut = null, CanPrintactual = 0, CanPrinttime = 0,  CanPrintsec = 0,
    CanPrintflagStopped = false, CanPrintstate = 0, CanPrintspeed = 0, CanPrintspeedTemp = 0, CanPrintflagPrint = 0, CanPrintsecStop = 0,
    CanPrintONS = 0, CanPrintflagRunning = false;

var BathTestct = 0, BathTestresults = null, BathTestctIn = null,  BathTestctOut = null, BathTestactual = 0, BathTesttime = 0,  BathTestsec = 0,
    BathTestflagStopped = false, BathTeststate = 0, BathTestspeed = 0, BathTestspeedTemp = 0, BathTestflagPrint = 0, BathTestsecStop = 0,
    BathTestONS = 0, BathTestflagRunning = false;

var Fillingct = 0, Fillingresults = null, FillingctIn = null,  FillingctOut = null, FillingctRj=null, Fillingactual = 0, Fillingtime = 0,
    Fillingsec = 0, FillingflagStopped = false, Fillingstate = 0, Fillingspeed = 0, FillingspeedTemp = 0, FillingflagPrint = 0,
    FillingsecStop = 0, FillingONS = 0, FillingflagRunning = false;

var ValvsMachinect = 0, ValvsMachineresults = null, ValvsMachinectIn = null,  ValvsMachinectOut = null, ValvsMachineStatus = null, ValvsMachineactual = 0,  ValvsMachinetime = 0,
    ValvsMachinesec = 0,  ValvsMachineflagStopped = false,  ValvsMachinestate = 0,  ValvsMachinespeed = 0,  ValvsMachinespeedTemp = 0,  ValvsMachineflagPrint = 0,
    ValvsMachinesecStop = 0,  ValvsMachineONS = 0,  ValvsMachineflagRunning = false;

var Crimperct = 0, Crimperresults = null, CrimperctIn = null, CrimperctOut = null, Crimperactual = 0,
    Crimpertime = 0, Crimpersec = 0, CrimperflagStopped = false, Crimperstate = 0, Crimperspeed = 0,
    CrimperspeedTemp = 0,  CrimperflagPrint = 0, CrimpersecStop = 0, CrimperONS = 0,  CrimperflagRunning = false;

var Gassingct = 0, Gassingresults = null, GassingctIn = null,  GassingctOut = null,  Gassingactual = 0,  Gassingtime = 0,
    Gassingsec = 0,  GassingflagStopped = false,  Gassingstate = 0,  Gassingspeed = 0,  GassingspeedTemp = 0,  GassingflagPrint = 0,
    GassingsecStop = 0,  GassingONS = 0,  GassingflagRunning = false;

var LevelCheckerct = 0, LevelCheckerresults = null, LevelCheckerctIn = null,  LevelCheckerctOut = null, LevelCheckeractual = 0, LevelCheckertime = 0,  LevelCheckersec = 0,
    LevelCheckerflagStopped = false, LevelCheckerstate = 0, LevelCheckerspeed = 0, LevelCheckerspeedTemp = 0, LevelCheckerflagPrint = 0, LevelCheckersecStop = 0,
    LevelCheckerONS = 0, LevelCheckerflagRunning = false;

var MicroLeackct = 0, MicroLeackresults = null, MicroLeackctIn = null,  MicroLeackctOut = null, MicroLeackctWaste = null, MicroLeackactual = 0, MicroLeacktime = 0,  MicroLeacksec = 0,
    MicroLeackflagStopped = false, MicroLeackstate = 0, MicroLeackspeed = 0, MicroLeackspeedTemp = 0, MicroLeackflagPrint = 0, MicroLeacksecStop = 0,
    MicroLeackONS = 0, MicroLeackflagRunning = false;

var Cappingct = 0, Cappingresults = null, CappingctIn = null,  CappingctOut = null, CappingStatus = null, Cappingactual = 0, Cappingtime = 0,  Cappingsec = 0,
    CappingflagStopped = false, Cappingstate = 0, Cappingspeed = 0, CappingspeedTemp = 0, CappingflagPrint = 0, CappingsecStop = 0,
    CappingONS = 0, CappingflagRunning = false, CappingctWaste =null;

var Packingct = 0, Packingresults = null, PackingctIn = null,  PackingctOut = null, Packingactual = 0, Packingtime = 0,  Packingsec = 0,
    PackingflagStopped = false, Packingstate = 0, Packingspeed = 0, PackingspeedTemp = 0, PackingflagPrint = 0, PackingsecStop = 0,
    PackingONS = 0, PackingflagRunning = false;

var CheckWeighterWaste=0,secCheckWeighter=0;

var eol=0,secEOL=0;

var cA1, cA2, cA3;

var files = fs.readdirSync("C:/PULSE/AERO9_LOGS/"); //Leer documentos
var text2send=[];//Vector a enviar
var publishConfig;
var i=0;

var PubNub = require('pubnub');

var pubnub = new PubNub({
  publishKey : "pub-c-0ed92489-2094-40f6-8ba8-73cd03f4487e",
  subscribeKey : "sub-c-789a4f1c-bff6-11e7-888c-b22ca6e1970b",
  uuid: "ARG_TOR_AERO9"
});

var client1 = modbus.client.tcp.complete({
  'host': "192.168.10.92",
  'port': 502,
  'autoReconnect': true,
  'timeout': 60000,
  'logEnabled': true,
  'reconnectTimeout' : 30000
});
var client2 = modbus.client.tcp.complete({
  'host': "192.168.10.90",
  'port': 502,
  'autoReconnect': true,
  'timeout': 60000,
  'logEnabled': true,
  'reconnectTimeout' : 30000
});
var client3 = modbus.client.tcp.complete({
  'host': "192.168.10.91",
  'port': 502,
  'autoReconnect': true,
  'timeout': 60000,
  'logEnabled': true,
  'reconnectTimeout' : 30000
});

function idle(){
  i=0;
  text2send=[];
  for (var k=0;k<files.length;k++){//Verificar los archivos
    var stats = fs.statSync("C:/PULSE/AERO9_LOGS/"+files[k]);
    var mtime = new Date(stats.mtime).getTime();
    if (mtime< (Date.now() - (8*60*1000))&&files[k].indexOf("serialbox")==-1){
      text2send[i]=files[k];
      i++;
    }
  }
}
   function senderData(){
      pubnub.publish(publishConfig, function(status, response) {});
    }

    function joinWord(num1, num2) {
      var bits = "00000000000000000000000000000000";
      var bin1 = num1.toString(2),
        bin2 = num2.toString(2),
        newNum = bits.split("");

      for (i = 0; i < bin1.length; i++) {
        newNum[31 - i] = bin1[(bin1.length - 1) - i];
      }
      for (i = 0; i < bin2.length; i++) {
        newNum[15 - i] = bin2[(bin2.length - 1) - i];
      }
      bits = newNum.join("");
      return parseInt(bits, 2);
    }
    try{

          client1.connect();
          client2.connect();
          client3.connect();

          client1.on('connect', function(err) {

            cA1=setInterval(function(){
            client1.readHoldingRegisters(0, 16).then(function(resp) {
                CanPrintctIn=joinWord(resp.register[0], resp.register[1]);
                FillingctOut=joinWord(resp.register[2], resp.register[3]);
                ValvsMachineStatus=joinWord(resp.register[4], resp.register[5]);
                ValvsMachinectOut=joinWord(resp.register[6], resp.register[7]);
                CrimperctOut=joinWord(resp.register[8], resp.register[9]);
                GassingctOut=joinWord(resp.register[10], resp.register[11]);
                LevelCheckerctOut=joinWord(resp.register[12], resp.register[13]);
            });
      //------------------------------------------CanPrint----------------------------------------------
            CanPrintct = CanPrintctIn; //Igualar a la salida de la máquina
            if (CanPrintONS == 0 && CanPrintct) {
              CanPrintspeedTemp = CanPrintct;
             // CntInCanPrintAnt = CntInCanPrint;
             // CntOutCanPrintAnt = CntOutCanPrint;
              CanPrintONS = 1;
            }
            if(CanPrintct > CanPrintactual){
              if(CanPrintflagStopped){
                CanPrintspeed = CanPrintct -CanPrintspeedTemp;
                CanPrintspeedTemp = CanPrintct;
                CanPrintsec=0;
              }
              CanPrintsecStop = 0;
              CanPrintsec++;
              CanPrinttime = Date.now();
              CanPrintstate = 1;
              CanPrintflagStopped = false;
              CanPrintflagRunning = true;
            } else if( CanPrintct == CanPrintactual ){
              if(CanPrintsecStop == 0){
                CanPrinttime = Date.now();
              }
              CanPrintsecStop++;
              if(CanPrintsecStop>=25){
                CanPrintspeed = 0;
                CanPrintstate = 2;
                CanPrintspeedTemp = CanPrintct;
                CanPrintflagStopped = true;
                CanPrintflagRunning = false;
              }
              if(CanPrintsecStop%120==0 ||CanPrintsecStop ==25 ){
                CanPrintflagPrint=1;

                if(CanPrintsecStop%120==0){
                  CanPrinttime = Date.now();
                }
              }
            }
            CanPrintactual = CanPrintct;
            if(CanPrintsec==60){
              CanPrintsec = 0;
              if(CanPrintflagRunning && CanPrintct){
                CanPrintflagPrint=1;
                CanPrintsecStop = 0;
                CanPrintspeed = CanPrintct -CanPrintspeedTemp;
                CanPrintspeedTemp = CanPrintct;
              }
            }
            CanPrintresults = {
              ST: CanPrintstate,
              CPQI: CanPrintct,
              //CPQO: CanPrintctOut,
              SP: CanPrintspeed
            };
            if (CanPrintflagPrint == 1) {
              for (var key in CanPrintresults) {
                if(!isNaN(CanPrintresults[key])&&CanPrintresults[key]!=null)
                fs.appendFileSync('C:/Pulse/AERO9_LOGS/arg_tor_CanPrint_AERO9.log', 'tt=' + CanPrinttime + ',var=' + key + ',val=' + CanPrintresults[key] + '\n');
              }
              CanPrintflagPrint = 0;
            }

        //------------------------------------------CanPrint----------------------------------------------
            //------------------------------------------Filling----------------------------------------------
            Fillingct = FillingctOut; //Igualar a la salida de la máquina
            if (FillingONS == 0 && Fillingct) {
              FillingspeedTemp = Fillingct;
            //  CntInFillingAnt = CntInFilling;
             // CntOutFillingAnt = CntOutFilling;
              FillingONS = 1;
            }
            if(Fillingct > Fillingactual){
              if(FillingflagStopped){
                Fillingspeed = Fillingct -FillingspeedTemp;
                FillingspeedTemp = Fillingct;
                Fillingsec=0;
              }
              FillingsecStop = 0;
              Fillingsec++;
              Fillingtime = Date.now();
              Fillingstate = 1;
              FillingflagStopped = false;
              FillingflagRunning = true;
            } else if( Fillingct == Fillingactual ){
              if(FillingsecStop == 0){
                Fillingtime = Date.now();
              }
              FillingsecStop++;
              if(FillingsecStop>=25){
                Fillingspeed = 0;
                Fillingstate = 2;
                FillingspeedTemp = Fillingct;
                FillingflagStopped = true;
                FillingflagRunning = false;
              }
              if(FillingsecStop%120==0 ||FillingsecStop ==25 ){
                FillingflagPrint=1;

                if(FillingsecStop%120==0){
                  Fillingtime = Date.now();
                }
              }
            }
            Fillingactual = Fillingct;
            if(Fillingsec==60){
              Fillingsec = 0;
              if(FillingflagRunning && Fillingct){
                FillingflagPrint=1;
                FillingsecStop = 0;
                Fillingspeed = Fillingct -FillingspeedTemp;
                FillingspeedTemp = Fillingct;
              }
            }
            Fillingresults = {
              ST: Fillingstate,
              //CPQI: FillingctIn,//Igualar a la entrada del wise
              CPQO: Fillingct,
              SP: Fillingspeed
            };
            if (FillingflagPrint == 1) {
              for (var key in Fillingresults) {
                if(!isNaN(Fillingresults[key])&&Fillingresults[key]!=null)
                fs.appendFileSync('C:/Pulse/AERO9_LOGS/arg_tor_Filling_AERO9.log', 'tt=' + Fillingtime + ',var=' + key + ',val=' + Fillingresults[key] + '\n');
              }
              FillingflagPrint = 0;
            }

        //------------------------------------------Filling----------------------------------------------
         //////--ValvsMachine--------------------------------------------------------------------------------------------------------------------
             ValvsMachinect = ValvsMachinectOut; //Igualar a la salida de la máquina
            if (ValvsMachineONS == 0 && ValvsMachinect) {
              ValvsMachinespeedTemp = ValvsMachinect;
             // CntInValvsMachineAnt = CntInValvsMachine;
             // CntOutValvsMachineAnt = CntOutValvsMachine;
              ValvsMachineONS = 1;
            }
            if(ValvsMachinect > ValvsMachineactual){
              if(ValvsMachineflagStopped){
                ValvsMachinespeed = ValvsMachinect -ValvsMachinespeedTemp;
                ValvsMachinespeedTemp = ValvsMachinect;
                ValvsMachinesec=0;
              }
              ValvsMachinesecStop = 0;
              ValvsMachinesec++;
              ValvsMachinetime = Date.now();
              ValvsMachinestate = 1;
              ValvsMachineflagStopped = false;
              ValvsMachineflagRunning = true;
            } else if( ValvsMachinect == ValvsMachineactual ){
              if(ValvsMachinesecStop == 0){
                ValvsMachinetime = Date.now();
              }
              ValvsMachinesecStop++;
              if(ValvsMachinesecStop>=30){
                ValvsMachinespeed = 0;
                ValvsMachinestate = 2;
                ValvsMachinespeedTemp = ValvsMachinect;
                ValvsMachineflagStopped = true;
                ValvsMachineflagRunning = false;
              }
              if(ValvsMachinesecStop%120==0 ||ValvsMachinesecStop ==30 ){
                ValvsMachineflagPrint=1;

                if(ValvsMachinesecStop%120==0){
                  ValvsMachinetime = Date.now();
                }
              }
            }
            ValvsMachineactual = ValvsMachinect;
            if(ValvsMachinesec==60){
              ValvsMachinesec = 0;
              if(ValvsMachineflagRunning && ValvsMachinect){
                ValvsMachineflagPrint=1;
                ValvsMachinesecStop = 0;
                ValvsMachinespeed = ValvsMachinect -ValvsMachinespeedTemp;
                ValvsMachinespeedTemp = ValvsMachinect;
              }
            }
            if(ValvsMachinestate==2 && ValvsMachineStatus==0){
              ValvsMachinestate=3;
            }
            ValvsMachineresults = {
              ST: ValvsMachinestate,
            //  CPQI: ValvsMachinectIn,//Igualar a la entrada del wise
              CPQO: ValvsMachinect,
              SP: ValvsMachinespeed
            };
            if (ValvsMachineflagPrint == 1) {
              for (var key in ValvsMachineresults) {
                if(!isNaN(ValvsMachineresults[key])&& ValvsMachineresults[key]!=null)
                fs.appendFileSync('C:/Pulse/AERO9_LOGS/arg_tor_ValvsMachine_AERO9.log', 'tt=' + ValvsMachinetime + ',var=' + key + ',val=' + ValvsMachineresults[key] + '\n');
              }
              ValvsMachineflagPrint = 0;
            }
          //////--ValvsMachine--------------------------------------------------------------------------------------------------------------------
      //------------------------------------------Crimper----------------------------------------------
            Crimperct = CrimperctOut; //Igualar a la salida de la máquina
            if (CrimperONS == 0 && Crimperct) {
              CrimperspeedTemp = Crimperct;
              //CntInCrimperAnt = CntInCrimper;
             // CntOutCrimperAnt = CntOutCrimper;
              CrimperONS = 1;
            }
            if(Crimperct > Crimperactual){
              if(CrimperflagStopped){
                Crimperspeed = Crimperct -CrimperspeedTemp;
                CrimperspeedTemp = Crimperct;
                Crimpersec=0;
              }
              CrimpersecStop = 0;
              Crimpersec++;
              Crimpertime = Date.now();
              Crimperstate = 1;
              CrimperflagStopped = false;
              CrimperflagRunning = true;
            } else if( Crimperct == Crimperactual ){
              if(CrimpersecStop == 0){
                Crimpertime = Date.now();
              }
              CrimpersecStop++;
              if(CrimpersecStop>=50){
                Crimperspeed = 0;
                Crimperstate = 2;
                CrimperspeedTemp = Crimperct;
                CrimperflagStopped = true;
                CrimperflagRunning = false;
              }
              if(CrimpersecStop%120==0 ||CrimpersecStop ==50 ){
                CrimperflagPrint=1;

                if(CrimpersecStop%120==0){
                  Crimpertime = Date.now();
                }
              }
            }
            Crimperactual = Crimperct;
            if(Crimpersec==60){
              Crimpersec = 0;
              if(CrimperflagRunning && Crimperct){
                CrimperflagPrint=1;
                CrimpersecStop = 0;
                Crimperspeed = Crimperct -CrimperspeedTemp;
                CrimperspeedTemp = Crimperct;
              }
            }
            Crimperresults = {
              ST: Crimperstate,
            //  CPQI: CrimperctIn,//Igualar a la entrada del wise
              CPQO: Crimperct,
              SP: Crimperspeed
            };
            if (CrimperflagPrint == 1) {
              for (var key in Crimperresults) {
                if(!isNaN(Crimperresults[key])&&Crimperresults[key]!=null)
                fs.appendFileSync('C:/Pulse/AERO9_LOGS/arg_tor_Crimper_AERO9.log', 'tt=' + Crimpertime + ',var=' + key + ',val=' + Crimperresults[key] + '\n');
              }
              CrimperflagPrint = 0;
            }

        //------------------------------------------Crimper----------------------------------------------

          //////--Gassing--------------------------------------------------------------------------------------------------------------------
             Gassingct = GassingctOut; //Igualar a la salida de la máquina
            if (GassingONS == 0 && Gassingct) {
              GassingspeedTemp = Gassingct;
             // CntInGassingAnt = CntInGassing;
             // CntOutGassingAnt = CntOutGassing;
              GassingONS = 1;
            }
            if(Gassingct > Gassingactual){
              if(GassingflagStopped){
                Gassingspeed = Gassingct -GassingspeedTemp;
                GassingspeedTemp = Gassingct;
                Gassingsec=0;
              }
              GassingsecStop = 0;
              Gassingsec++;
              Gassingtime = Date.now();
              Gassingstate = 1;
              GassingflagStopped = false;
              GassingflagRunning = true;
            } else if( Gassingct == Gassingactual ){
              if(GassingsecStop == 0){
                Gassingtime = Date.now();
              }
              GassingsecStop++;
              if(GassingsecStop>=70){
                Gassingspeed = 0;
                Gassingstate = 2;
                GassingspeedTemp = Gassingct;
                GassingflagStopped = true;
                GassingflagRunning = false;
              }
              if(GassingsecStop%120==0 ||GassingsecStop ==60 ){
                GassingflagPrint=1;

                if(GassingsecStop%120==0){
                  Gassingtime = Date.now();
                }
              }
            }
            Gassingactual = Gassingct;
            if(Gassingsec==60){
              Gassingsec = 0;
              if(GassingflagRunning && Gassingct){
                GassingflagPrint=1;
                GassingsecStop = 0;
                Gassingspeed = Gassingct -GassingspeedTemp;
                GassingspeedTemp = Gassingct;
              }
            }
            Gassingresults = {
              ST: Gassingstate,
              //CPQI: GassingctIn,//Igualar a la entrada del wise
              CPQO: Gassingct,
              SP: Gassingspeed
            };
            if (GassingflagPrint == 1) {
              for (var key in Gassingresults) {
                if(!isNaN(Gassingresults[key])&&Gassingresults[key]!=null)
                fs.appendFileSync('C:/Pulse/AERO9_LOGS/arg_tor_Gassing_AERO9.log', 'tt=' + Gassingtime + ',var=' + key + ',val=' + Gassingresults[key] + '\n');
              }
              GassingflagPrint = 0;
            }
          //////--Gassing--------------------------------------------------------------------------------------------------------------------

         //------------------------------------------LevelChecker----------------------------------------------
            LevelCheckerct = LevelCheckerctOut; //Igualar a la salida de la máquina
            if (LevelCheckerONS == 0 && LevelCheckerct) {
              LevelCheckerspeedTemp = LevelCheckerct;
             // CntInLevelCheckerAnt = CntInLevelChecker;
             // CntOutLevelCheckerAnt = CntOutLevelChecker;
              LevelCheckerONS = 1;
            }
            if(LevelCheckerct > LevelCheckeractual){
              if(LevelCheckerflagStopped){
                LevelCheckerspeed = LevelCheckerct -LevelCheckerspeedTemp;
                LevelCheckerspeedTemp = LevelCheckerct;
                LevelCheckersec=0;
              }
              LevelCheckersecStop = 0;
              LevelCheckersec++;
              LevelCheckertime = Date.now();
              LevelCheckerstate = 1;
              LevelCheckerflagStopped = false;
              LevelCheckerflagRunning = true;
            } else if( LevelCheckerct == LevelCheckeractual ){
              if(LevelCheckersecStop == 0){
                LevelCheckertime = Date.now();
              }
              LevelCheckersecStop++;
              if(LevelCheckersecStop>=25){
                LevelCheckerspeed = 0;
                LevelCheckerstate = 2;
                LevelCheckerspeedTemp = LevelCheckerct;
                LevelCheckerflagStopped = true;
                LevelCheckerflagRunning = false;
              }
              if(LevelCheckersecStop%120==0 ||LevelCheckersecStop ==25 ){
                LevelCheckerflagPrint=1;

                if(LevelCheckersecStop%120==0){
                  LevelCheckertime = Date.now();
                }
              }
            }
            LevelCheckeractual = LevelCheckerct;
            if(LevelCheckersec==60){
              LevelCheckersec = 0;
              if(LevelCheckerflagRunning && LevelCheckerct){
                LevelCheckerflagPrint=1;
                LevelCheckersecStop = 0;
                LevelCheckerspeed = LevelCheckerct -LevelCheckerspeedTemp;
                LevelCheckerspeedTemp = LevelCheckerct;
              }
            }
            LevelCheckerresults = {
              ST: LevelCheckerstate,
             // CPQI: LevelCheckerctIn,
              CPQO: LevelCheckerct,
              SP: LevelCheckerspeed
            };
            if (LevelCheckerflagPrint == 1) {
              for (var key in LevelCheckerresults) {
                if(!isNaN(LevelCheckerresults[key])&&LevelCheckerresults[key]!=null)
                fs.appendFileSync('C:/Pulse/AERO9_LOGS/arg_tor_LevelChecker_AERO9.log', 'tt=' + LevelCheckertime + ',var=' + key + ',val=' + LevelCheckerresults[key] + '\n');
              }
              LevelCheckerflagPrint = 0;
            }
  //------------------------------------------LevelChecker----------------------------------------------
          },1000);
          });
          client1.on('error', function(err) {
            clearInterval(cA1);
          });
          client1.on('close', function() {
            clearInterval(cA1);
          });
          client2.on('connect', function(err) {

            cA2=setInterval(function(){
              client2.readHoldingRegisters(0, 16).then(function(resp) {
                BathTestctOut=joinWord(resp.register[0], resp.register[1]);
                MicroLeackctOut=joinWord(resp.register[2], resp.register[3]);
                MicroLeackctWastes=joinWord(resp.register[4], resp.register[5]);
                CappingStatus=joinWord(resp.register[6], resp.register[7]);
                CappingctOut=joinWord(resp.register[8], resp.register[9]);
                CappingctWaste=joinWord(resp.register[10], resp.register[11]);
              });
               //------------------------------------------BathTest----------------------------------------------
                BathTestct = BathTestctOut; //Igualar a la salida de la máquina
                if (BathTestONS == 0 && BathTestct) {
                  BathTestspeedTemp = BathTestct;
                 // CntInBathTestAnt = CntInBathTest;
                 // CntOutBathTestAnt = CntOutBathTest;
                  BathTestONS = 1;
                }
                if(BathTestct > BathTestactual){
                  if(BathTestflagStopped){
                    BathTestspeed = BathTestct -BathTestspeedTemp;
                    BathTestspeedTemp = BathTestct;
                    BathTestsec=0;
                  }
                  BathTestsecStop = 0;
                  BathTestsec++;
                  BathTesttime = Date.now();
                  BathTeststate = 1;
                  BathTestflagStopped = false;
                  BathTestflagRunning = true;
                } else if( BathTestct == BathTestactual ){
                  if(BathTestsecStop == 0){
                    BathTesttime = Date.now();
                  }
                  BathTestsecStop++;
                  if(BathTestsecStop>=25){
                    BathTestspeed = 0;
                    BathTeststate = 2;
                    BathTestspeedTemp = BathTestct;
                    BathTestflagStopped = true;
                    BathTestflagRunning = false;
                  }
                  if(BathTestsecStop%120==0 ||BathTestsecStop ==25 ){
                    BathTestflagPrint=1;

                    if(BathTestsecStop%120==0){
                      BathTesttime = Date.now();
                    }
                  }
                }
                BathTestactual = BathTestct;
                if(BathTestsec==60){
                  BathTestsec = 0;
                  if(BathTestflagRunning && BathTestct){
                    BathTestflagPrint=1;
                    BathTestsecStop = 0;
                    BathTestspeed = BathTestct -BathTestspeedTemp;
                    BathTestspeedTemp = BathTestct;
                  }
                }
                BathTestresults = {
                  ST: BathTeststate,
                 // CPQI: BathTestctIn,
                  CPQO: BathTestct,
                  SP: BathTestspeed
                };
                if (BathTestflagPrint == 1) {
                  for (var key in BathTestresults) {
                    if(!isNaN(BathTestresults[key])&&BathTestresults[key]!=null)
                    fs.appendFileSync('C:/Pulse/AERO9_LOGS/arg_tor_BathTest_AERO9.log', 'tt=' + BathTesttime + ',var=' + key + ',val=' + BathTestresults[key] + '\n');
                  }
                  BathTestflagPrint = 0;
                }

            //------------------------------------------BathTest----------------------------------------------
             //------------------------------------------MicroLeack----------------------------------------------
                MicroLeackct = MicroLeackctOut; //Igualar a la salida de la máquina
                if (MicroLeackONS == 0 && MicroLeackct) {
                  MicroLeackspeedTemp = MicroLeackct;
                 // CntInMicroLeackAnt = CntInMicroLeack;
                 // CntOutMicroLeackAnt = CntOutMicroLeack;
                  MicroLeackONS = 1;
                }
                if(MicroLeackct > MicroLeackactual){
                  if(MicroLeackflagStopped){
                    MicroLeackspeed = MicroLeackct -MicroLeackspeedTemp;
                    MicroLeackspeedTemp = MicroLeackct;
                    MicroLeacksec=0;
                  }
                  MicroLeacksecStop = 0;
                  MicroLeacksec++;
                  MicroLeacktime = Date.now();
                  MicroLeackstate = 1;
                  MicroLeackflagStopped = false;
                  MicroLeackflagRunning = true;
                } else if( MicroLeackct == MicroLeackactual ){
                  if(MicroLeacksecStop == 0){
                    MicroLeacktime = Date.now();
                  }
                  MicroLeacksecStop++;
                  if(MicroLeacksecStop>=25){
                    MicroLeackspeed = 0;
                    MicroLeackstate = 2;
                    MicroLeackspeedTemp = MicroLeackct;
                    MicroLeackflagStopped = true;
                    MicroLeackflagRunning = false;
                  }
                  if(MicroLeacksecStop%120==0 ||MicroLeacksecStop ==25 ){
                    MicroLeackflagPrint=1;

                    if(MicroLeacksecStop%120==0){
                      MicroLeacktime = Date.now();
                    }
                  }
                }
                MicroLeackactual = MicroLeackct;
                if(MicroLeacksec==60){
                  MicroLeacksec = 0;
                  if(MicroLeackflagRunning && MicroLeackct){
                    MicroLeackflagPrint=1;
                    MicroLeacksecStop = 0;
                    MicroLeackspeed = MicroLeackct -MicroLeackspeedTemp;
                    MicroLeackspeedTemp = MicroLeackct;
                  }
                }
                MicroLeackresults = {
                  ST: MicroLeackstate,
                 // CPQI: MicroLeackctIn,
                  CPQO: MicroLeackct,
                  CPQR: MicroLeackctWaste,
                  SP: MicroLeackspeed
                };
                if (MicroLeackflagPrint == 1) {
                  for (var key in MicroLeackresults) {
                    if(!isNaN(MicroLeackresults[key])&&MicroLeackresults[key]!=null)
                    fs.appendFileSync('C:/Pulse/AERO9_LOGS/arg_tor_MicroLeack_AERO9.log', 'tt=' + MicroLeacktime + ',var=' + key + ',val=' + MicroLeackresults[key] + '\n');
                  }
                  MicroLeackflagPrint = 0;
                }

            //------------------------------------------MicroLeack----------------------------------------------

             //------------------------------------------Capping----------------------------------------------
                Cappingct = CappingctOut; //Igualar a la salida de la máquina
                if (CappingONS == 0 && Cappingct) {
                  CappingspeedTemp = Cappingct;
                 // CntInCappingAnt = CntInCapping;
                 // CntOutCappingAnt = CntOutCapping;
                  CappingONS = 1;
                }
                if(Cappingct > Cappingactual){
                  if(CappingflagStopped){
                    Cappingspeed = Cappingct -CappingspeedTemp;
                    CappingspeedTemp = Cappingct;
                    Cappingsec=0;
                  }
                  CappingsecStop = 0;
                  Cappingsec++;
                  Cappingtime = Date.now();
                  Cappingstate = 1;
                  CappingflagStopped = false;
                  CappingflagRunning = true;
                } else if( Cappingct == Cappingactual ){
                  if(CappingsecStop == 0){
                    Cappingtime = Date.now();
                  }
                  CappingsecStop++;
                  if(CappingsecStop>=25){
                    Cappingspeed = 0;
                    Cappingstate = 2;
                    CappingspeedTemp = Cappingct;
                    CappingflagStopped = true;
                    CappingflagRunning = false;
                  }
                  if(CappingsecStop%120==0 ||CappingsecStop ==25 ){
                    CappingflagPrint=1;

                    if(CappingsecStop%120==0){
                      Cappingtime = Date.now();
                    }
                  }
                }
                Cappingactual = Cappingct;
                if(Cappingsec==60){
                  Cappingsec = 0;
                  if(CappingflagRunning && Cappingct){
                    CappingflagPrint=1;
                    CappingsecStop = 0;
                    Cappingspeed = Cappingct -CappingspeedTemp;
                    CappingspeedTemp = Cappingct;
                  }
                }
                Cappingresults = {
                  ST: Cappingstate,
                 // CPQI: CappingctIn,
                  CPQO: CappingctOut,
                  CPQR: CappingctWaste,
                  SP: Cappingspeed
                };
                if (CappingflagPrint == 1) {
                  for (var key in Cappingresults) {
                    if(!isNaN(Cappingresults[key])&&Cappingresults[key]!=null)
                    fs.appendFileSync('C:/Pulse/AERO9_LOGS/arg_tor_Capping_AERO9.log', 'tt=' + Cappingtime + ',var=' + key + ',val=' + Cappingresults[key] + '\n');
                  }
                  CappingflagPrint = 0;
                }

  //------------------------------------------Capping----------------------------------------------
                 },1000);

          });
          client2.on('error', function(err) {
            clearInterval(cA2);
          });
          client2.on('close', function() {
                        clearInterval(cA2);
          });
          client3.on('connect', function(err) {

            cA3=setInterval(function(){
              client3.readHoldingRegisters(0, 16).then(function(resp) {
                PackingctIn=joinWord(resp.register[0], resp.register[1]);
                PackingctOut=joinWord(resp.register[2], resp.register[3]);
                CheckWeighterWaste=joinWord(resp.register[4], resp.register[5]);
                eol=joinWord(resp.register[6], resp.register[7]);
              });
    //------------------------------------------Packing----------------------------------------------
                Packingct = PackingctOut; //Igualar a la salida de la máquina
                if (PackingONS == 0 && Packingct) {
                  PackingspeedTemp = Packingct;
                 // CntInPackingAnt = CntInPacking;
                 // CntOutPackingAnt = CntOutPacking;
                  PackingONS = 1;
                }
                if(Packingct > Packingactual){
                  if(PackingflagStopped){
                    Packingspeed = Packingct -PackingspeedTemp;
                    PackingspeedTemp = Packingct;
                    Packingsec=0;
                  }
                  PackingsecStop = 0;
                  Packingsec++;
                  Packingtime = Date.now();
                  Packingstate = 1;
                  PackingflagStopped = false;
                  PackingflagRunning = true;
                } else if( Packingct == Packingactual ){
                  if(PackingsecStop == 0){
                    Packingtime = Date.now();
                  }
                  PackingsecStop++;
                  if(PackingsecStop>=25){
                    Packingspeed = 0;
                    Packingstate = 2;
                    PackingspeedTemp = Packingct;
                    PackingflagStopped = true;
                    PackingflagRunning = false;
                  }
                  if(PackingsecStop%120==0 ||PackingsecStop ==25 ){
                    PackingflagPrint=1;

                    if(PackingsecStop%120==0){
                      Packingtime = Date.now();
                    }
                  }
                }
                Packingactual = Packingct;
                if(Packingsec==60){
                  Packingsec = 0;
                  if(PackingflagRunning && Packingct){
                    PackingflagPrint=1;
                    PackingsecStop = 0;
                    Packingspeed = Packingct -PackingspeedTemp;
                    PackingspeedTemp = Packingct;
                  }
                }
                Packingresults = {
                  ST: Packingstate,
                  CPQI: PackingctIn,
                  CPQO: Packingct,
                  SP: Packingspeed
                };
                if (PackingflagPrint == 1) {
                  for (var key in Packingresults) {
                    if(!isNaN(Packingresults[key])&&Packingresults[key]!=null)
                    fs.appendFileSync('C:/Pulse/AERO9_LOGS/arg_tor_Packing_AERO9.log', 'tt=' + Packingtime + ',var=' + key + ',val=' + Packingresults[key] + '\n');
                  }
                  PackingflagPrint = 0;
                }

            //------------------------------------------Packing----------------------------------------------


                 //////----------------------------------------------------------------------------------------------------------------------
              if(secCheckWeighter>=60){
                fs.appendFileSync("C:/Pulse/AERO9_LOGS/arg_tor_CheckWeighter_AERO9.log","tt="+Date.now()+",var=CPQR"+",val="+CheckWeighterWaste+"\n");

                secCheckWeighter=0;
              }else{
                secCheckWeighter++;
              }
              //////--EOL--------------------------------------------------------------------------------------------------------------------


                 //////--EOL--------------------------------------------------------------------------------------------------------------------
              if(secEOL>=60){
                fs.appendFileSync("C:/Pulse/AERO9_LOGS/arg_tor_EOL_AERO9.log","tt="+Date.now()+",var=EOL"+",val="+eol+"\n");

                secEOL=0;
              }else{
                secEOL++;
              }
              //////--EOL--------------------------------------------------------------------------------


            },1000);
          });
          client3.on('error', function(err) {
            clearInterval(cA3);
          });
          client3.on('close', function() {
                        clearInterval(cA3);
          });


var noty=setInterval(function(){
   if(secPubNub>=60*5){
      idle();
      secPubNub=0;
      publishConfig = {
        channel : "Tor_Aero_Monitor",
        message : {
              line: "Aero9",
              tt: Date.now(),
              machines: text2send
              }
      };
      senderData();
    }else{
      secPubNub++;
    }
   } , 1000);

}catch(err){
   fs.appendFileSync("error.log", err + '\n');
   clearInterval(noty);
}
