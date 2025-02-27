using System;
using System.Collections.Generic;

namespace WebApplication6.Models;

public partial class Tłumaczeniewykonane
{
    public int Id { get; set; }

    public int TłumaczId { get; set; }

    public int JęzykŹródłowy { get; set; }

    public int JęzykDocelowy { get; set; }

    public DateTime DataWykonania { get; set; }

    public string NazwaDokumentu { get; set; } = null!;

    public virtual Jezyk JęzykDocelowyNavigation { get; set; } = null!;

    public virtual Jezyk JęzykŹródłowyNavigation { get; set; } = null!;

    public virtual Tłumacz Tłumacz { get; set; } = null!;
}
